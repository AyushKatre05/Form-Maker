/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

  export const AiChatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "Description :  Student registration for coding workshop on React & react native . On the basis of description please give form in json format with form title form subheading with form having Form field , form name , placeholder name and form label , field type , field required in Json format"},
          {text: "form field = {\\n      \\\"fieldName\\\": \\\"firstName\\\",\\n      \\\"placeholder\\\": \\\"ABC\\\",\\n      \\\"label\\\": \\\"First Name\\\",\\n      \\\"fieldType\\\": \\\"text\\\",\\n      \\\"required\\\": true\\n    },\\n\n"},
          {text: "title = formTitle, subHeading = formSubHeading , form = formFields "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "You're right! I should have used the variable names you provided. Here's the JSON structure with those changes:\n\n```json\n{\n  \"formTitle\": \"React & React Native Coding Workshop Registration\",\n  \"formSubHeading\": \"Join us for an immersive workshop on building web and mobile applications with React and React Native!\",\n  \"formFields\": [\n    {\n      \"fieldName\": \"firstName\",\n      \"placeholder\": \"Enter your first name\",\n      \"label\": \"First Name\",\n      \"fieldType\": \"text\",\n      \"required\": true\n    },\n    {\n      \"fieldName\": \"lastName\",\n      \"placeholder\": \"Enter your last name\",\n      \"label\": \"Last Name\",\n      \"fieldType\": \"text\",\n      \"required\": true\n    },\n    {\n      \"fieldName\": \"email\",\n      \"placeholder\": \"Enter your email address\",\n      \"label\": \"Email Address\",\n      \"fieldType\": \"email\",\n      \"required\": true\n    },\n    {\n      \"fieldName\": \"phoneNumber\",\n      \"placeholder\": \"Enter your phone number\",\n      \"label\": \"Phone Number\",\n      \"fieldType\": \"tel\",\n      \"required\": true\n    },\n    {\n      \"fieldName\": \"experienceLevel\",\n      \"placeholder\": \"Select your experience level\",\n      \"label\": \"Level of Experience\",\n      \"fieldType\": \"select\",\n      \"required\": true,\n      \"options\": [\n        { \"value\": \"beginner\", \"label\": \"Beginner\" },\n        { \"value\": \"intermediate\", \"label\": \"Intermediate\" },\n        { \"value\": \"advanced\", \"label\": \"Advanced\" }\n      ]\n    },\n    {\n      \"fieldName\": \"workshopGoals\",\n      \"placeholder\": \"Share your expectations and learning objectives\",\n      \"label\": \"What are your goals for this workshop?\",\n      \"fieldType\": \"textarea\",\n      \"required\": true\n    },\n    {\n      \"fieldName\": \"priorExperience\",\n      \"label\": \"Do you have any prior experience with React or React Native?\",\n      \"fieldType\": \"radio\",\n      \"required\": true,\n      \"options\": [\n        { \"value\": \"yes\", \"label\": \"Yes\" },\n        { \"value\": \"no\", \"label\": \"No\" }\n      ]\n    },\n    {\n      \"fieldName\": \"additionalInformation\",\n      \"placeholder\": \"Optional: Share any relevant information or questions\",\n      \"label\": \"Anything else you'd like to tell us?\",\n      \"fieldType\": \"textarea\",\n      \"required\": false\n    },\n    {\n      \"fieldType\": \"submit\",\n      \"value\": \"Register Now\"\n    }\n  ]\n}\n```\n\nNow the structure uses your desired variable names for:\n\n* `formTitle` \n* `formSubHeading`\n* `formFields`\n\nThis makes the JSON more consistent with your specific requirements.\n"},
        ],
      },
    ],
  });
