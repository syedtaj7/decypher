const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const genAI = new GoogleGenerativeAI('AIzaSyBjCBj-TtFmbfuOCgVQ9Fy3I4JN4nxWd_0');
  
  try {
    console.log('Checking available models...');
    
    // List available models (if this API has that feature)
    // Note: The SDK might not have a direct listModels function
    
    // Try to create a model with debug logging
    const models = ['gemini-pro', 'gemini-1.0-pro', 'gemini-1.5-pro'];
    
    console.log('Testing different model names:');
    
    for (const modelName of models) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Just test a simple prompt
        const result = await model.generateContent('Hello, what models are available in the Gemini API?');
        const response = await result.response;
        console.log(`Model ${modelName} works!`);
        console.log(`Response: ${response.text().substring(0, 100)}...`);
      } catch (error) {
        console.error(`Error with model ${modelName}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
