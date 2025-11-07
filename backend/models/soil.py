# YOLOv11 detection/segmentation loader + inference
from ultralytics import YOLO
import numpy as np
import cv2
from .shared import device
import os

class SoilModel:
    
    def __init__(self, weights: str):
        if not os.path.isfile(weights):
            raise FileNotFoundError(f"[SoilModel] Weights not found at: {os.path.abspath(weights)}")
        print(f"[SoilModel] Loading from: {os.path.abspath(weights)}")
        self.model = YOLO(weights)


    def predict(self, bgr_img: np.ndarray):
        print("[SoilModel] Running soil detection/segmentation inference...")
        res = self.model.predict(source=bgr_img, verbose=False)[0]
        boxes = []
        names = res.names

        if res.boxes is not None:
            for b in res.boxes:
                x1, y1, x2, y2 = b.xyxy[0].tolist()
                conf = float(b.conf[0].item())
                cls = int(b.cls[0].item())
                label = names.get(cls, str(cls)) if isinstance(names, dict) else str(cls)
                boxes.append({
                    "x1": x1, "y1": y1, "x2": x2, "y2": y2,
                    "conf": conf, "cls": cls, "label": label
                })
            print(f"[SoilModel] Found {len(boxes)} bounding boxes ✅")

        mask_annotated = None
        if hasattr(res, "masks") and res.masks is not None:
            # If your YOLOv11 weights are a segmentation variant, draw masks
            m = res.masks.data.cpu().numpy()  # (n, h, w)
            merged = (m.sum(axis=0) > 0.5).astype(np.uint8)
            mask_annotated = merged
            print("[SoilModel] Segmentation mask generated ✅")

        return boxes, mask_annotated, res
