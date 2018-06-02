---
title: Kaggling
date: 2018-06-02T06:07:50.106Z
description: >-
  Today I decide to start participate in kaggle competition(old one) and trying
  to implement my own pipeline from downloading the datasets to submitting the
  answer
image: null
---
At first I install [kaggle-api](https://github.com/Kaggle/kaggle-api) so that I can download the datasets more easily.
I decide to participate in this [competition](https://www.kaggle.com/c/dogs-vs-cats-redux-kernels-edition) first since it was the first one being teach in fast.ai class.
After download the datasets I check at the file and found out that there is two folder which is train and test folder. Inside the folder got images of cats and dogs in one folder. It was better to seperate all those image in different folder and use that folder name as label.
It took me a while to find a way to seperate them since I don't know the best way to split and copy all the file to seperate folder.
After playing around I decide to use pathlib and shutil for this task.

