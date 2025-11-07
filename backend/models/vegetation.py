# YOLOv8 segmentation loader + inference
from ultralytics import YOLO
import numpy as np
import cv2
import os
# from .shared import device  # optional – use if you move models to GPU


class VegetationSegModel:
    def __init__(self, weights: str):
        if not os.path.isfile(weights):
            raise FileNotFoundError(f"[VegetationSegModel] Weights not found at: {os.path.abspath(weights)}")
        print(f"[VegetationSegModel] Loading from: {os.path.abspath(weights)}")
        self.model = YOLO(weights)

    def predict_mask(self, bgr_img: np.ndarray) -> np.ndarray:
        """Run YOLOv8 segmentation and return a resized binary vegetation mask."""
        print("[VegetationSegModel] Running vegetation segmentation inference...")
        h, w = bgr_img.shape[:2]
        res = self.model.predict(source=bgr_img, verbose=False)[0]

        # If the model is a segmentation model, extract masks
        if hasattr(res, "masks") and res.masks is not None:
            m = res.masks.data.cpu().numpy()  # (n, mh, mw)
            merged = (m.sum(axis=0) > 0.5).astype(np.uint8)  # (mh, mw)

            # ✅ Resize mask to match input image size (fix shape mismatch)
            if merged.shape != (h, w):
                print(
                    f"[VegetationSegModel] Resizing mask from {merged.shape} → {(h, w)}"
                )
                merged = cv2.resize(merged, (w, h), interpolation=cv2.INTER_NEAREST)

            print("[VegetationSegModel] Segmentation mask generated ✅")
            return merged

        # If it's detection-only, fallback to blank mask
        print("[VegetationSegModel] No segmentation masks found — returning blank mask ⚠️")
        return np.zeros((h, w), dtype=np.uint8)



  