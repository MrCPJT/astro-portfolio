---
title: "Predicting Student Success"
company: "Portfolio project"
startDate: "2023-10-01"
endDate: "2023-11-30"
domain: "Education analytics and multiclass classification"
summary: "A student outcome prediction project using higher-education enrolment, demographic, socioeconomic, and academic performance data."
outcome: "Random Forest scored best of ten classifiers on the validation set, with 76 % accuracy and a macro-averaged F1 of 0.68 across three student outcomes."
figure:
  src: "./figure.png"
  alt: "Bar chart of student outcome counts: graduate 2,209, dropout 1,421, enrolled 794"
  caption: "Outcome classes across the 4,424 students. Graduate is the most common outcome and enrolled the least."
technologies:
  [
    "Python",
    "scikit-learn",
    "Flask",
    "waitress",
    "Docker",
    "AWS Elastic Beanstalk",
  ]
link: "https://github.com/MrCPJT/Student-Success-Predictor"
---

## Project Overview

This project explored whether higher-education student outcomes could be predicted from institutional data collected around enrolment and early academic performance. The modelling task was framed as a multiclass classification problem across dropout, enrolled, and graduate outcomes.

The work was motivated by a practical intervention question: if institutions can identify students at risk of dropping out, they can target social, academic, or economic support earlier.

## Problem

The dataset includes academic path, demographic, socioeconomic, and first-year performance variables from Portuguese higher education institutions. The objective was to train a model that could classify student status while keeping the pipeline reproducible enough to serve locally and deploy as a containerised service.

## Approach

- Reviewed the business and institutional context for student retention.
- Performed exploratory analysis across categorical and numerical features using `matplotlib` and `seaborn`.
- Used correlation and mutual information to identify weak or low-relevance features for comparison.
- Prepared feature matrices with `DictVectorizer` and scaling where required.
- Evaluated nine multiclass classification model families, including Logistic Regression, Decision Tree, Random Forest, K-Nearest Neighbours, SGD, SVC variants, and Naive Bayes variants.
- Compared models with metrics including accuracy, cross-validation accuracy, precision, recall, ROC AUC, and F1 using macro averaging.
- Selected Random Forest as the strongest baseline and tuned it with `GridSearchCV`.
- Served the final model locally with Flask and `waitress`.
- Containerised the service with Docker and deployed it to AWS Elastic Beanstalk.

## Results

The dataset covers 4,424 students with 34 features and three outcomes (graduate 2,209, dropout 1,421, enrolled 794). It was split 60/20/20 into 2,654 training, 885 validation and 885 test students.

Ten classifiers were compared on the validation set. Random Forest scored best overall, with 76 % accuracy and macro-averaged precision 0.72, recall 0.67 and F1 0.68. Logistic regression matched its accuracy, SVC and linear SVC came within one point, and the decision tree, nearest-neighbour and Naive Bayes models scored 66–71 %. A baseline that always predicted "graduate" would score 49.9 %, so the result is well above chance. Dropping the 20 weakest features changed scores very little, so all 34 were kept.

## Next Steps

A stronger production version would add calibration analysis, fairness review across student groups, and clearer intervention thresholds so the model output could be tied to support decisions rather than used as a standalone score.

## Technical Notes

The repository includes the original notebook, train and validation splits, model export workflow, Flask prediction service, Dockerfile, and Elastic Beanstalk deployment notes. The cloud service referenced in the README was later terminated to avoid ongoing cost.
