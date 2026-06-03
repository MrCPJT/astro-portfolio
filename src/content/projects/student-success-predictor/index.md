---
title: "Predicting Student Success"
company: "Portfolio project"
startDate: "2023-10-01"
endDate: "2023-11-30"
domain: "Education analytics and multiclass classification"
summary: "A student outcome prediction project using higher-education enrolment, demographic, socioeconomic, and academic performance data."
technologies:
  [
    "Python",
    "Pandas",
    "scikit-learn",
    "Random Forest",
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

The final Random Forest model remained consistent when trained on the extended training split and evaluated on held-out test data. The project also produced a working deployment path from trained model artifact to local service, Docker image, and cloud-hosted endpoint.

## Technical Notes

The repository includes the original notebook, train and validation splits, model export workflow, Flask prediction service, Dockerfile, and Elastic Beanstalk deployment notes. The cloud service referenced in the README was later terminated to avoid ongoing cost.

## Next Steps

A stronger production version would add calibration analysis, fairness review across student groups, and clearer intervention thresholds so the model output could be tied to support decisions rather than used as a standalone score.
