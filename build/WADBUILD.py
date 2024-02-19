import WADGEN

wad = WADGEN.WADMaker("titles/0001000248414241/21")
wad.encrypt_file("0000005e")
wad.encrypt_file("0000005f")
wad.dump("Wii Shop Channel.wad")