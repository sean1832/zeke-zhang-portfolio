from PIL import Image
import os
import shutil
import argparse

# constants
assets_path = 'src/assets/'
img_formats = ['.jpg', '.jpeg', '.png']
archive_path = 'src/assets/archive/'

def parse_arguments():
    parser = argparse.ArgumentParser(description='Resize and convert images.')
    parser.add_argument('-s', '--size', type=int, default=-1,
                        help='The maximum width or height for the output images.')
    return parser.parse_args()

def delete_dir(dir):
    shutil.rmtree(dir)

def convert_webp(in_path, out_path):
    print('converting', in_path)
    im = Image.open(in_path)
    im.save(out_path, 'webp', optimize=True, quality=80)

def is_subpath_of(path_to_check, base_path):
    abs_path_to_check = os.path.abspath(path_to_check)
    abs_base_path = os.path.abspath(base_path)
    return abs_path_to_check.startswith(abs_base_path)

def resize_image(image_path, max_size):
    with Image.open(image_path) as img:
        width, height = img.size
        if width > max_size or height > max_size:
            # Calculate the ratio
            ratio = min(max_size/width, max_size/height)
            new_width = int(width * ratio)
            new_height = int(height * ratio)
            img = img.resize((new_width, new_height), Image.LANCZOS)
            img.save(image_path)


def handel_copy(root, file, dir):
    path = os.path.join(root, file)
    relative_path = os.path.relpath(root, dir)
    # copy file to archive
    archive_file = os.path.join(archive_path, relative_path, file)

    # create dir if not exists
    os.makedirs(os.path.dirname(archive_file), exist_ok=True)
    
    shutil.copy(path, archive_file)

def convert_all(dir, size):
    for root, dirs, files in os.walk(dir):
        if is_subpath_of(root, archive_path):
            # skip archive
            continue
        for file in files:
            if file.endswith(tuple(img_formats)):
                path = os.path.join(root, file)
                handel_copy(root, file, dir)

                if size > 0:
                    # resize image
                    resize_image(path, size)

                # convert to webp
                name = os.path.splitext(file)[0]
                out_path = os.path.join(root, name + '.webp')
                convert_webp(path, out_path) # replace

                # delete original file
                os.remove(path)
    
if __name__ == '__main__':
    try:
        args = parse_arguments()
        convert_all(assets_path, args.size)
        print('\n================\ndone.')
    except Exception as e:
        print(e)
  