import json
import os
from pathlib import Path
from fastapi import APIRouter

router = APIRouter(prefix="/api/la-centrale")
json_structure_name = "la_centrale_{0}_{1}_{2}"


@router.get("/{brand}/{model}")
async def get_la_centrale_data(brand, model):
    app_folder = Path(__file__).parents[2]
    json_folder_name = "la_centrale_{0}_{1}".format(brand, model)
    json_folder_path = app_folder.joinpath("scraper", "data", json_folder_name)
    files = os.listdir(json_folder_path)
    data = []
    for f in files:
        with open(json_folder_path.joinpath(f)) as file:
            data.append(json.loads(str(file.read())))
    return data
