import os

structure = {
    
        "backend": {
            "models": {
                "__init__.py": "",
                "vegetation.py": "# YOLOv8 segmentation loader + inference\n",
                "soil.py": "# YOLOv11 detection/segmentation loader + inference\n"
            },
            "routers": {
                "vegetation.py": "# /predict/vegetation\n",
                "soil.py": "# /predict/soil\n",
                "health.py": "# /health\n"
            },
            "schemas": {
                "responses.py": "# Pydantic models for API responses\n"
            },
            "utils": {
                "images.py": "# image IO, overlay helpers\n",
                "settings.py": "# env config\n"
            },
            "main.py": "# FastAPI app\n",
            "requirements.txt": "",
            "README.md": "# Backend README\n",
            ".env": "API_PREFIX=/api\nCORS_ALLOW_ORIGINS=*\nVEG_MODEL_PATH=./models/best_veg.pt\nSOIL_MODEL_PATH=./models/best_soil_yolo11.pt\nPORT=8000\nLOG_LEVEL=info\n"
        },
        "frontend": {
            "index.html": "",
            "package.json": "",
            "vite.config.js": "",
            "src": {
                "App.jsx": "",
                "api.js": "",
                "components": {
                    "Dropzone.jsx": "",
                    "ResultCard.jsx": "",
                    "OverlayCanvas.jsx": ""
                },
                "styles.css": "",
                "lib": {
                    "draw.js": ""
                }
            }
        }
    
}

def create_structure(base_path, tree):
    for name, content in tree.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)

create_structure(".", structure)
print("✅ Project structure created successfully!")
