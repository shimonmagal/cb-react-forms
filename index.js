import React from 'react';
import { Provider } from "react-redux";
import Builder from "./src/components/FormBuilder";
import Generator from "./src/components/FormGenerator";
import store from "./src/store";

import "react-rangeslider/lib/index.css";
import './css/font-awesome.min.css';
import "./css/bootstrap.min.css";
import "./src/App.scss";

const FormBuilder = ({ onSubmit, onSubmitAs, itemsA, itemsACaption, itemsALogo, itemsB, itemsBCaption, previewItems2 }) => (
	<Provider store={store}>
    <Builder 
      onSubmit={onSubmit}
      onSubmitAs={onSubmitAs} 
      itemsA={itemsA}
      itemsACaption={itemsACaption}
      itemsALogo={itemsALogo}
      itemsB={itemsB}
      itemsBCaption={itemsBCaption}
      previewItems2={previewItems2}
    />
  </Provider>
)

const FormGenerator = ({ 
	formData, 
	responseData, 
	readOnly, 
	onSubmit 
}) => (
	<Provider store={store}>
		<Generator 
			formData={formData} 
			responseData={responseData} 
			readOnly={readOnly} 
			onSubmit={onSubmit} 
		/>
	</Provider>
)

export { FormBuilder, FormGenerator }