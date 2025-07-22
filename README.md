# Cost to Serve Software Calculator

A sophisticated web application that helps organizations calculate the true cost of delivering software and quantify the business value of developer experience improvements.

## 🎯 Purpose

The Cost to Serve Software (CTS-SW) Calculator provides a clear, quantifiable way to understand the efficiency of your software development process by measuring the total cost per unit of software delivered.

**Formula:** `CTS-SW = Total Development Cost ÷ Software Units Delivered`

## ✨ Features

- **Interactive Cost Calculator**: Calculate cost per software unit (deployments, features, releases, etc.)
- **Preset Scenarios**: Choose from Large Enterprise, Mid-size Tech Company, or create custom parameters
- **ROI Analysis**: Calculate return on investment and payback periods for developer experience improvements
- **Visual Analytics**: Interactive charts showing cost comparisons and 5-year projections
- **Educational Content**: Learn about the CTS-SW methodology and its business impact

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cost-to-serve-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 📊 How to Use

1. **Select Organization Type**: Choose from preset scenarios or create a custom configuration
2. **Configure Parameters**: 
   - Number of developers
   - Annual cost per developer
   - Software units delivered annually
   - Unit type (deployments, features, releases, etc.)
3. **Set Improvement Goals**: Use the slider to set expected efficiency improvements (5-50%)
4. **Enter Implementation Cost**: Add the cost of implementing developer experience improvements
5. **Analyze Results**: View cost per unit, total savings, ROI, and payback period

## 📈 Key Metrics Calculated

- **Current CTS-SW**: Cost per software unit before improvements
- **Improved CTS-SW**: Cost per software unit after improvements
- **Unit Savings**: Cost reduction per software unit
- **Total Annual Savings**: Overall cost savings per year
- **ROI**: Return on investment ratio
- **Payback Period**: Time to recover implementation costs

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/ui/     # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Tools

Need to estimate modernization costs? Try our [Technology Modernization Cost Estimator](https://modernization-estimator.app)
