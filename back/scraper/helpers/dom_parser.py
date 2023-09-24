from typing import List


def parse_style(html: str, elements: List[str]) -> List[dict]:
    """
    Parse l'attribut 'style' d'une balise HTML, et retourne les valeurs des sous-attributs recherchés

    Args:
        html (str): la balise HTML à parser (exemple: <div style="..." id="..." class="..."></div>)
        elements (List[str]): Liste des clés à rechercher dans la balise 'style' (exemple: height, width, background-color, etc...)

    Returns:
        List[dict]: Liste de dictionnaire {'élément_à_rechercher': 'valeur'}
    """
    dom = html.partition(" ")[0].removeprefix("<")
    styles_as_str = ""
    attributes = html.removeprefix("<" + dom).removesuffix("></" + dom + ">")
    for att in attributes.split(" "):
        if (att).startswith('style="'):
            styles_as_str = att.removeprefix("style=").replace('"', "")
            continue
    styles_as_list = styles_as_str.replace(" ", "").split(";")
    result = []
    for style in styles_as_list:
        style_attribute = style.split(":")
        if style_attribute[0] in elements:
            result.append({style_attribute[0]: style_attribute[1].replace("px", "")})

    return result
