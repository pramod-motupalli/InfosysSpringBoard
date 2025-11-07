import streamlit as st
import requests
from PIL import Image
import io
import json

st.title("YOLO Model Inference")
st.write("Upload an image to get soil type and confidence score.")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png", "bmp", "gif"])

if uploaded_file is not None:

    # Display uploaded image
    image = Image.open(uploaded_file).convert("RGB")
    st.image(image, caption="Uploaded Image", use_column_width=True)

    # Convert image to bytes
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format="JPEG")
    img_byte_arr = img_byte_arr.getvalue()

    files = {"file": ("image.jpg", img_byte_arr, "image/jpeg")}

    # Your FastAPI endpoint URL ✅
    fastapi_url = "https://annabella-paterfamiliar-judgmatically.ngrok-free.dev/predict/"

    try:
        response = requests.post(fastapi_url, files=files)
        response.raise_for_status()

        predictions = response.json()

        st.subheader("Predicted Soil Type:")

        # ✅ Handle JSON response format safely
        if isinstance(predictions, dict) and "results" in predictions:
            results_list = predictions["results"]
        elif isinstance(predictions, list):
            results_list = predictions
        else:
            results_list = []

        if results_list:
            found = False
            for result in results_list:
                for pred in result.get("predictions", []):
                    soil_type = pred.get("class_name", "Unknown")
                    score = pred.get("score", 0)

                    found = True
                    st.success(f"✔ Soil Type: {soil_type} — Confidence: {score:.2f}")

            if not found:
                st.warning("No soil objects detected.")
        else:
            st.warning("No results found in the response.")

    except json.JSONDecodeError:
        st.error("Invalid JSON received from server.")
    except requests.exceptions.RequestException as e:
        st.error(f"Error communicating with FastAPI: {e}")
    except Exception as e:
        st.error(f"Unexpected error: {e}")
