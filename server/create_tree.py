import os

def create_tree(path):
    item_list = os.listdir(path)
    result = []

    for item in item_list:
        if item.startswith('.'):
            continue 
        item_path = os.path.join(path, item)
        item_info = {"name": item}

        if os.path.isdir(item_path):
            item_info["type"] = "folder"
            item_info["children"] = create_tree(item_path)
        else:
            item_info["type"] = "file"

        result.append(item_info)

    return result

# root_directory = "./myfiles"
# tree = {
#     "name": os.path.basename(root_directory),
#     "type": "folder",
#     "children": create_tree(root_directory)
# }

