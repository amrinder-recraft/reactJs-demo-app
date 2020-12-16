import React from 'react'

import AppRoutes from './AppRoutes'
import ErrorBoundary from './ErrorBoundary'
const App = () => <ErrorBoundary><AppRoutes /></ErrorBoundary>

export default App