# # Pydantic models for API responses
# from pydantic import BaseModel
# from typing import List, Optional


# class Box(BaseModel):
#  x1: float
#  y1: float
#  x2: float
#  y2: float
#  conf: float
#  cls: int
#  label: str


# class VegetationPredictResponse(BaseModel):
#  width: int
#  height: int
#  mask_png_b64: str # RGBA/PNG of binary vegetation mask
#  overlay_png_b64: str # original + overlay for quick preview
#  coverage_pct: float


# class SoilPredictResponse(BaseModel):
#  width: int
#  height: int
#  boxes: List[Box]
#  annotated_png_b64: Optional[str] = None

# app/schemas/responses.py
from pydantic import BaseModel
from typing import List, Optional, Dict


class Box(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    conf: float
    cls: int
    label: str


class VegetationPredictResponse(BaseModel):
    # Input image dimensions
    width: int
    height: int

    # Primary visuals
    # Pure transparent mask (PNG, RGBA)
    mask_png_b64: Optional[str] = None
    # Overlay (original + mask). For convenience we also mirror to image_base64 for frontend compatibility
    overlay_png_b64: Optional[str] = None
    image_base64: Optional[str] = None  # same as overlay_png_b64 when provided

    # Stats
    coverage_pct: float
    segments: Optional[int] = None
    processingTime: Optional[float] = None


class SoilPredictResponse(BaseModel):
    # Input image dimensions
    width: int
    height: int

    # Detections
    boxes: List[Box]

    # Visuals
    annotated_png_b64: Optional[str] = None  # annotated image with boxes (and mask overlay if present)
    mask_png_b64: Optional[str] = None       # optional: transparent mask PNG when segmentation is available

    # (Optional) future fields — uncomment if/when your backend returns them
    # counts: Optional[Dict[str, int]] = None     # class -> count
    # legend: Optional[Dict[str, str]] = None     # class -> hex color
