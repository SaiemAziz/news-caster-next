import React, { createContext, useLayoutEffect, useState } from 'react';
import Loading from './Loading';
import * as tf from '@tensorflow/tfjs';
export const ModelContext = createContext('')
const ModelComponent = ({ children, model, wordIndex }) => {
    return (
        <ModelContext.Provider value={{ model, wordIndex }}>
            {children}
        </ModelContext.Provider>
    );
};

export default ModelComponent;

export async function getStaticProps() {
    let res = await fetch("models/model/word_index.json")
    let data = await res.json()
    let myModel = await tf.loadLayersModel("models/model/model.json")
    // console.log(data);
    return {
        props: {
            model: myModel,
            wordIndex: data
        }
    }
}