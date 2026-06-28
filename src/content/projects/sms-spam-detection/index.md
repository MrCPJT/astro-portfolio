---
title: "SMS Spam Detection Using NLP"
company: "Portfolio project"
startDate: "2023-11-01"
endDate: "2023-12-31"
domain: "Natural language processing and cloud deployment"
summary: "A machine learning project that classifies SMS messages as spam or legitimate text, then packages the trained model for serverless inference on AWS."
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

The project produced a complete prototype path from notebook analysis to API-backed model inference. The final implementation demonstrated that the model could be invoked through a REST endpoint after being built, containerised, pushed to ECR, and connected to AWS Lambda.

## Technical Notes

The repository documents the Poetry environment, NLTK dependency handling, Docker build commands, ECR push workflow, Lambda setup, and API Gateway integration. A Kaggle notebook version is also referenced from the original resume entry for the exploratory and modelling work.

## Next Steps

The most useful next iteration would be to add a lightweight monitoring loop for prediction distributions, false-positive review, and retraining triggers so the model could be maintained after deployment.
