import blurhash
import os
import json
from PIL import Image

assets_path = 'src/assets/'

def get_blurhash(path):
    with Image.open(path) as image:
        return blurhash.encode(image=image, x_components=4, y_components=3)

def write_to_json(data, path):
    # if path does not exist, create it
    if not os.path.exists(os.path.dirname(path)):
        os.makedirs(os.path.dirname(path))
    with open(path, 'w') as outfile:
        json.dump(data, outfile, indent=2)

def get_all_blurhashes(dir):
    blurhashes = {}
    for root, dirs, files in os.walk(dir):
        for file in files:
            if file.endswith('.webp'):
                path = os.path.join(root, file)
                name = os.path.splitext(file)[0]
                blurhashes[name] = get_blurhash(path)
                print('data:', name, blurhashes[name])
    return blurhashes

if __name__ == '__main__':
    assets_path = 'src/assets/'
    try:
      blurhashes = get_all_blurhashes(assets_path)
      print(f'\n===========\n{blurhashes}')
      write_to_json(blurhashes, f'{assets_path}blurhashes.json')
      print('done.')
      
    except Exception as e:
        print('Error:', e)
    