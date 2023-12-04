from PIL import Image
import os
import shutil

# constants
assets_path = '../src/assets/'
img_formats = ['.jpg', '.jpeg', '.png']
zip_path = '../src/assets/archive'
archive_path = '../src/assets/archive/'

def zip_files(src_dir, dst_path):
    print('zipping', src_dir)
    shutil.make_archive(dst_path, 'zip', src_dir)

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


def handel_copy(root, file, dir):
    path = os.path.join(root, file)
    relative_path = os.path.relpath(root, dir)
    # copy file to archive
    archive_file = os.path.join(archive_path, relative_path, file)

    # create dir if not exists
    os.makedirs(os.path.dirname(archive_file), exist_ok=True)
    
    shutil.copy(path, archive_file)

def convert_all(dir):
    # zip_files(dir, zip_path)
    # find all images in dir
    for root, dirs, files in os.walk(dir):
        if is_subpath_of(root, archive_path):
            # skip archive
            continue
        for file in files:
            if file.endswith(tuple(img_formats)):
                path = os.path.join(root, file)
                handel_copy(root, file, dir)

                # convert to webp
                name = os.path.splitext(file)[0]
                out_path = os.path.join(root, name + '.webp')
                convert_webp(path, out_path) # replace

                # delete original file
                os.remove(path)
    
if __name__ == '__main__':
    try:
        convert_all(assets_path)
        zip_files(archive_path, zip_path)
        print('\n\ndone.')
    except Exception as e:
        print(e)
  