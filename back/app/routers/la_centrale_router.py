from datetime import date
import re
import json
import os
from pathlib import Path
from fastapi import APIRouter

router = APIRouter(prefix="/la-centrale")
json_structure_name = "la_centrale_{0}_{1}_{2}"


@router.get("/{brand}/{model}")
async def get_la_centrale_data(brand, model):
    now = date.today()
    month = str(now.month) if len(str(now.month)) == 2 else "0" + str(now.month)
    file_name = json_structure_name.format(
        brand, model, (str(now.year) + "-" + month + "-" + str(now.day))
    )
    app_folder = Path(__file__).parents[2]
    json_folder_name = "la_centrale_{0}_{1}".format(brand, model)
    json_folder_path = app_folder.joinpath("data", json_folder_name)
    files = os.listdir(json_folder_path)
    today_file = ""
    for file in files:
        match = re.search(file_name + "T.{14}.json", file)
        if match:
            today_file = file
            continue
    with open(json_folder_path.joinpath(today_file)) as json_file:
        json_as_dict = json.loads(str(json_file.read()))

    return json_as_dict[0]
