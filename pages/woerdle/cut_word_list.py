file = open("/all_words.txt", "r")
output = open("/data.json", "w")
output.write('[\n')
for line in file:
    if len(line) == 6:
        line = line.replace('ß', 'ẞ')
        output.write('"' + line.upper()[:-1] + '", \n')
output.write(']')
file.close()
output.close()
