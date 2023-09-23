from typing import List


def parse_style(html: str, elements: List[str]) -> str:
    dom = html.partition(" ")[0].removeprefix("<")
    styles_as_str = ""
    prefix = "<" + dom
    suffix = "></" + dom + ">"
    attributes = html.removeprefix(prefix).removesuffix(suffix)
    for att in attributes.split(" "):
        if (att).startswith('style="'):
            styles_as_str = att.removeprefix("style=").replace('"', "")
            continue
    styles_as_list = styles_as_str.replace(" ", "").split(";")
    result = []
    for style in styles_as_list:
        style_attribute = style.split(":")
        if style_attribute[0] in elements:
            result.append(style_attribute[1].replace("px", ""))

    return result
