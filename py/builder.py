from music import music_info, replacement_order

def indent(contents, times):

    lines = contents.splitlines(True)

    prefix = ""
    for i in range(0, times*4):
        prefix += ' '

    output = ""
    for now in lines:
        output += prefix + now
    
    return output


def apply_nav(nav, duplicate_location):

    now_nav = nav

    if duplicate_location != -1:

        start_remove = duplicate_location
        for i in range(3):
            start_remove = nav.rfind('\n', 0, start_remove)
        end_remove = duplicate_location
        for i in range(2):
            end_remove = nav.find('\n', end_remove+1)
        now_nav = nav[0:start_remove] + nav[end_remove:]

    return now_nav 
    

def build(name, contents, fname, is_standard):

    if is_standard:

        dest_name = "../"

        b_file = open("front-standard.html")
        e_file = open("back-standard.html")

        beginning = b_file.read()
        end = e_file.read()

        b_file.close()
        e_file.close()

    else:

        dest_name = "../composition/"

        b_file = open("front-music.html")
        e_file = open("back-music.html")

        beginning = b_file.read()
        end = e_file.read()

        b_file.close()
        e_file.close()

    name = name + " | "
    if name == "Daniel DeAnda | ":
        name = ""

    tilde_location = beginning.find('~')
    beginning = beginning[0:tilde_location] + name + beginning[tilde_location+1:]

    to_write = beginning + '\n' + contents + '\n' + end

    destination = open(dest_name + fname + ".html", 'x')
    destination.write(to_write)
    destination.close()

def main():
    
    raw_standard_file = open("raw-standard.html")
    raw_music_file = open("raw-music.html")
    nav_standard_file = open("nav-standard.html")
    nav_music_file = open("nav-music.html")

    raw_standard = raw_standard_file.read().split("~ ")
    raw_music = raw_music_file.read()
    nav_standard = nav_standard_file.read()
    nav_music = nav_music_file.read()

    raw_standard_file.close()
    raw_music_file.close()
    nav_standard_file.close()
    nav_music_file.close()

    for i in range(1, len(raw_standard)):

        contents = raw_standard[i]

        end_of_info = contents.find('\n')
        split_index = contents.rfind(' ', 0, end_of_info)
        info = [contents[0:split_index], contents[split_index+1:end_of_info]]
        duplicate_location = nav_standard.find(info[1])

        now_nav = apply_nav(nav_standard, duplicate_location)
        
        contents = "<h1>" + info[0] + "</h1>\n" + now_nav + contents[end_of_info:]
        build(info[0], indent(contents[0:len(contents)-1], 3), info[1], True)

    for i in range(0, len(music_info)):

        duplicate_location = nav_music.find(info[1])
        now_nav = apply_nav(nav_music, duplicate_location)

        contents = raw_music
        for j in range(0, len(replacement_order)):

            current_tilde = contents.find('~')
            contents = contents[0:current_tilde] + music_info[i][replacement_order[j]] + contents[current_tilde+1:]
        
        contents = "<h1>" + music_info[i][0] + "</h1>\n" + now_nav + '\n' + contents
        build(music_info[i][0], indent(contents, 3), music_info[i][3], False)

main()