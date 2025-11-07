# # image IO, overlay helpers
# from io import BytesIO
# from PIL import Image
# import base64
# import numpy as np
# import cv2




# def read_imagefile(file_bytes: bytes) -> Image.Image:
#  return Image.open(BytesIO(file_bytes)).convert("RGB")




# def pil_to_cv2(img: Image.Image) -> np.ndarray:
# # RGB PIL → BGR cv2
#  return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)




# def cv2_to_pil(img: np.ndarray) -> Image.Image:
#  return Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))




# def encode_png_b64(img: Image.Image) -> str:
#  buf = BytesIO()
#  img.save(buf, format="PNG")
#  return base64.b64encode(buf.getvalue()).decode()
 



# def overlay_mask(image_bgr: np.ndarray, mask: np.ndarray, alpha: float = 0.5) -> np.ndarray:
#     import cv2
#     h, w = image_bgr.shape[:2]

#     # Ensure 2D binary mask, correct size
#     if mask.ndim == 3:
#         mask = mask[..., 0]
#     mask = (mask > 0).astype(np.uint8)
#     if mask.shape != (h, w):
#         mask = cv2.resize(mask, (w, h), interpolation=cv2.INTER_NEAREST)

#     overlay = image_bgr.copy()
#     color = (0, 255, 0)  # green
#     overlay[mask > 0] = (
#         (1 - alpha) * overlay[mask > 0] + alpha * np.array(color)
#     ).astype(np.uint8)
#     return overlay

# app/utils/images.py
# image IO & overlay helpers
from io import BytesIO
from PIL import Image
import base64
import numpy as np
import cv2


def read_imagefile(file_bytes: bytes) -> Image.Image:
    """Read bytes → PIL RGB image"""
    return Image.open(BytesIO(file_bytes)).convert("RGB")


def pil_to_cv2(img: Image.Image) -> np.ndarray:
    """Convert RGB PIL → BGR cv2"""
    return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)


def cv2_to_pil(img: np.ndarray) -> Image.Image:
    """Convert BGR cv2 → RGB PIL"""
    return Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))


def encode_png_b64(img: Image.Image) -> str:
    """Encode a PIL image to base64 PNG string"""
    buf = BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode()


def overlay_mask(
    image_bgr: np.ndarray,
    mask: np.ndarray,
    alpha: float = 0.5,
    color: tuple[int, int, int] = (0, 255, 0),
) -> np.ndarray:
    """
    Blend a binary mask onto a BGR image with given color and transparency.
    - image_bgr: np.ndarray (H, W, 3)
    - mask: np.ndarray (H, W) bool/0-1/0-255
    - color: (B, G, R)
    - alpha: 0..1 blend ratio
    """
    h, w = image_bgr.shape[:2]

    # Ensure 2D binary mask, correct size
    if mask.ndim == 3:
        mask = mask[..., 0]
    if mask.dtype != np.uint8:
        mask = (mask > 0).astype(np.uint8)
    if mask.shape != (h, w):
        mask = cv2.resize(mask, (w, h), interpolation=cv2.INTER_NEAREST)

    # Create overlay
    overlay = image_bgr.copy()
    color_layer = np.zeros_like(image_bgr)
    color_layer[mask > 0] = color  # apply color where mask is 1

    a = max(0.0, min(float(alpha), 1.0))  # clamp alpha
    cv2.addWeighted(color_layer, a, overlay, 1 - a, 0, overlay)
    return overlay
