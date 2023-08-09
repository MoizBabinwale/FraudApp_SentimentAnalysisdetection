import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tfjs from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import '@tensorflow/tfjs-node-gpu';

import '@tensorflow/tfjs-node/dist/index';
import '@tensorflow/tfjs-node-gpu/dist/index';
import '@tensorflow/tfjs-node-gpu';

import '@tensorflow/tfjs-layers';
import '@tensorflow/tfjs-node-gpu';
import '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';

async function loadModel() {
    const sentiment = await use.load();
    return sentiment;
}

function SentimentAnalysisComponent() {
    const [text, setText] = useState('');
    const [sentiment, setSentiment] = useState('');

    const analyzeSentiment = async () => {
        if (text.trim() === '') return;

        const sentimentModel = await loadModel();
        const sentimentResult = await sentimentModel.embed(text);
        const score = await sentimentResult.data();

        if (score[0] > score[1]) {
            setSentiment('Positive');
        } else {
            setSentiment('Negative');
        }
    };

    return (
        <div>
            <textarea
                placeholder="Enter a sentence for sentiment analysis..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={analyzeSentiment}>Analyze Sentiment</button>
            {sentiment && <p>Sentiment: {sentiment}</p>}
        </div>
    );
}

export default SentimentAnalysisComponent;
