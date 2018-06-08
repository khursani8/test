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
The folder being divide into train(cats,dogs),valid(cats,dogs) and test(unlabel)
Then I start with using image augmentation side on and zoom size 1.1
fit the model with 1 epoch, fit with cylical learning rate and then fit with unfreeze layer using differential learning rate annealing for each layer group.

Even though I use all those technique I still cannot improve my model. The best score I can get is 0.6 which is at rank 129. After research a bit I remember that most of the people who win kaggle competition use technique such as ensemble and decide to try it. At first I try to train resnet50 with dropout 0.4 and got val loss of 0.21. Next model I use densenet121 with dropout 0.4 and got val loss of 0.3 and inception4 with dropout 0.3 and got val loss 0.22. 

Since all of the model have been train, I try evaluate it with test set and do ensemble to get the final probability and submit my answer to kaggle. Shockingly my score from 0.6 jump to 0.46 which is at rank 36. After a few epoch to try to make my score better I think I can try to add one more model which is vgg19 with dropout 0.2 and got val loss of 0.27.

After do ensemble with 4 models I got public rank of 0.44 from 0.46 at rank 27.
