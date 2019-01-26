import slate

with open('grd20181EN.pdf') as f:
    doc = slate.PDF(f)
    print(doc)