---
title: "SMS Spam Detection Using NLP"
company: "Portfolio project"
startDate: "2023-11-01"
endDate: "2023-12-31"
domain: "Natural language processing and cloud deployment"
summary: "A machine learning project that classifies SMS messages as spam or legitimate text, then packages the trained model for serverless inference on AWS."
outcome: "An SGD classifier reached 97.9 % accuracy and a spam F1 of 0.919 on 1,115 held-out messages, then shipped as a Docker image behind AWS Lambda and API Gateway."
figure:
  src: "./figure.png"
  alt: "Density plot of message length for spam and not-spam messages"
  caption: "Message length by class (0 is not spam, 1 is spam). Spam messages are longer and more tightly clustered than legitimate ones, averaging 139 characters against 71."
technologies:
  [
    "Python",
    "scikit-learn",
    "NLTK",
    "Docker",
    "AWS ECR",
    "AWS Lambda",
    "API Gateway",
  ]
link: "https://github.com/MrCPJT/SMS-Spam-Detection"
---

## Project Overview

This project built an SMS spam-filtering model and took it beyond a notebook by packaging the model for deployment. The work combined exploratory text analysis, NLP preprocessing, supervised model comparison, containerisation, and a serverless AWS serving pattern.

Spam filtering is a practical classification problem with a clear user outcome: reduce exposure to unwanted, disruptive, and potentially fraudulent messages while keeping legitimate messages available.

## Problem

The goal was to classify incoming SMS messages as either spam or ham. The project needed to address both model quality and model usability, so the final output could be called through an API rather than remaining as an offline experiment.

## Approach

- Explored the raw text data with `pandas`, `matplotlib`, and supporting visual analysis.
- Preprocessed messages using NLP techniques including tokenisation, lemmatisation, stopword handling, and vectorisation.
- Compared multiple supervised learning models using `scikit-learn`.
- Tuned the strongest candidate with a grid search workflow to improve accuracy and AUC.
- Exported the trained model with `pickle` for reuse during inference.
- Packaged the inference code and model artifact into a Docker image.
- Pushed the image to AWS Elastic Container Registry and deployed it through AWS Lambda.
- Exposed the Lambda function with API Gateway so the classifier could be called over HTTP.

## Results

The data featured 5,572 messages, of which 747 (13.4 %) were spam. Six models were compared with default settings on a validation set of 1,115 messages. All scored 97–98 % accuracy, so they were ranked on spam-class F1, where a stochastic gradient descent (SGD) classifier came first at 0.89.

Only 13.4 % of messages are spam, so a model that labelled everything as not spam would already score 86.6 % accuracy.

The final SGD model was trained on 80 % of the data and scored once on 1,115 held-out messages. It reached 97.9 % accuracy and an F1 of 0.919. The untuned SGD baseline scored 97.8 % and 0.912, so tuning only provided a marginal gain. A test invocation of the deployed Lambda function took about 109 ms after an 8.5 s cold start.

## Next Steps

The most useful next iteration would be to add a lightweight monitoring loop for prediction distributions, false-positive review, and retraining triggers so the model could be maintained after deployment.

## Technical Notes

The repository documents the Poetry environment, NLTK dependency handling, Docker build commands, ECR push workflow, Lambda setup, and API Gateway integration. A Kaggle notebook version is also referenced from the original resume entry for the exploratory and modelling work.
