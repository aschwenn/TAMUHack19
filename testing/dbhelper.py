import csv

def sortData():
    with open('data.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        temp = ''
        line_count = 0
        row_count = sum(1 for row in csv_reader)
        row_num = 0
        for row in csv_reader:
            for i in range(len(list(row))):
                c = row[i]
                dept = c[0:4]
                course = c[6:9]
                section = c[10:13]
                temp = dept + ',' + course + ',' + section + ','
                line_count += 1

                p = row[line_count][i]
                name = p.rsplit(' ', 1)
                lastName = name[0]
                firstName = name[1]
                temp += lastName + ',' + firstName + ','
                line_count += 1

                temp += row[line_count][i]
                print temp


