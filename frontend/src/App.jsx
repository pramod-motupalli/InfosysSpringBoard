// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Button } from "@/components/ui/button"


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <div className="flex min-h-svh flex-col items-center justify-center ">
//       <Button>Click me</Button>
//     </div>
//     </>
//   )
// }

// export default App


// import { useState, useEffect } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
// import { VegetationSegmentation } from './components/VegetationSegmentation';
// import { SoilDetection } from './components/SoilDetection';
// import { Leaf, Mountain, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// import { Badge } from './components/ui/badge';
// import { Alert, AlertDescription } from './components/ui/alert';

// import { Toaster, toast } from 'sonner';
// import * as api from './utils/api';
// import { isLocalMode, getFastAPIUrl } from './utils/env';

// export default function App() {
//   const [backendStatus, setBackendStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
//   const [backendError, setBackendError] = useState<string>('');

//   useEffect(() => {
//     checkBackendHealth();
//   }, []);

//   const checkBackendHealth = async () => {
//     try {
//       setBackendStatus('checking');
//       const health = await api.checkBackendHealth();
//       if (health.status === 'ok') {
//         setBackendStatus('healthy');
//         setBackendError('');
//       } else {
//         setBackendStatus('error');
//         setBackendError(health.message || health.hint || 'Backend is not available');
//       }
//     } catch (error) {
//       console.error('Backend health check failed:', error);
//       setBackendStatus('error');
//       setBackendError(error instanceof Error ? error.message : 'Cannot connect to backend');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Toaster />

//       {/* Header */}
//       <header className="bg-white border-b sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <Leaf className="h-8 w-8 text-green-600" />
//                 <Mountain className="h-8 w-8 text-amber-600" />
//               </div>
//               <div>
//                 <h1>Agricultural Analysis</h1>
//                 <p className="text-sm text-gray-600">AI-Powered Image Segmentation & Detection</p>
//               </div>
//             </div>

//             {/* Status Indicators */}
//             <div className="flex items-center gap-2">
//               <Badge variant="secondary" className="gap-1">
//                 {isLocalMode() ? '🏠 Local' : '☁️ Production'}
//               </Badge>
              
//               {backendStatus === 'checking' && (
//                 <Badge variant="outline" className="gap-1">
//                   <AlertCircle className="h-3 w-3" />
//                   Checking...
//                 </Badge>
//               )}
              
//               {backendStatus === 'healthy' && (
//                 <Badge variant="default" className="gap-1 bg-green-600">
//                   <CheckCircle className="h-3 w-3" />
//                   Connected
//                 </Badge>
//               )}
              
//               {backendStatus === 'error' && (
//                 <Badge variant="destructive" className="gap-1" title={backendError}>
//                   <XCircle className="h-3 w-3" />
//                   Offline
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Backend Error Alert */}
//         {backendStatus === 'error' && (
//           <Alert variant="destructive" className="mb-6">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               <div className="space-y-2">
//                 <p className="font-medium">Backend Not Connected</p>
//                 <p className="text-sm">{backendError}</p>
//                 <div className="text-xs space-y-1 mt-2">
//                   <p>To fix this:</p>
//                   {isLocalMode() ? (
//                     <ol className="list-decimal list-inside space-y-0.5 ml-2">
//                       <li>Start FastAPI: <code className="bg-red-100 px-1 rounded">uvicorn main:app --host 0.0.0.0 --port 8000</code></li>
//                       <li>Verify VITE_FASTAPI_URL in .env.local: <code className="bg-red-100 px-1 rounded">{getFastAPIUrl()}</code></li>
//                     </ol>
//                   ) : (
//                     <ol className="list-decimal list-inside space-y-0.5 ml-2">
//                       <li>Set FASTAPI_URL in Supabase Edge Functions settings</li>
//                       <li>Ensure FastAPI is publicly accessible</li>
//                     </ol>
//                   )}
//                   <button 
//                     onClick={checkBackendHealth}
//                     className="text-xs underline mt-2 hover:no-underline"
//                   >
//                     Retry Connection
//                   </button>
//                 </div>
//               </div>
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* Model Tabs */}
//         <Tabs defaultValue="vegetation" className="w-full">
//           <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
//             <TabsTrigger value="vegetation" className="gap-2">
//               <Leaf className="h-4 w-4" />
//               Vegetation Segmentation
//             </TabsTrigger>
//             <TabsTrigger value="soil" className="gap-2">
//               <Mountain className="h-4 w-4" />
//               Soil Detection
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="vegetation">
//             <VegetationSegmentation />
//           </TabsContent>

//           <TabsContent value="soil">
//             <SoilDetection />
//           </TabsContent>
//         </Tabs>
//       </main>

//       {/* Footer */}
//       <footer className="border-t bg-white mt-16">
//         <div className="container mx-auto px-4 py-6">
//           <p className="text-center text-sm text-gray-600">
//             Agricultural Analysis Platform • Powered by YOLOv8 & Machine Learning
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { VegetationSegmentation } from './components/VegetationSegmentation';
import { SoilDetection } from './components/SoilDetection';
import { Leaf, Mountain, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { Toaster } from 'sonner';
import * as api from './utils/api';
import { isLocalMode, getFastAPIUrl } from './utils/env';

export default function App() {
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'healthy' | 'error'
  const [backendError, setBackendError] = useState('');

  useEffect(() => {
    checkBackendHealth();
  }, []);

  async function checkBackendHealth() {
    try {
      setBackendStatus('checking');
      const health = await api.checkBackendHealth();
      if (health.status === 'ok') {
        setBackendStatus('healthy');
        setBackendError('');
      } else {
        setBackendStatus('error');
        setBackendError(health.message || health.hint || 'Backend is not available');
      }
    } catch (error) {
      console.error('Backend health check failed:', error);
      setBackendStatus('error');
      setBackendError(error?.message || 'Cannot connect to backend');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-green-600" />
                <Mountain className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Agricultural Analysis</h1>
                <p className="text-sm text-gray-600">AI-Powered Image Segmentation & Detection</p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                {isLocalMode() ? '🏠 Local' : '☁️ Production'}
              </Badge>

              {backendStatus === 'checking' && (
                <Badge variant="outline" className="gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Checking...
                </Badge>
              )}

              {backendStatus === 'healthy' && (
                <Badge variant="default" className="gap-1 bg-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Connected
                </Badge>
              )}

              {backendStatus === 'error' && (
                <Badge variant="destructive" className="gap-1" title={backendError}>
                  <XCircle className="h-3 w-3" />
                  Offline
                </Badge>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            API: {getFastAPIUrl()}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Backend Error Alert */}
        {backendStatus === 'error' && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">Backend Not Connected</p>
                <p className="text-sm">{backendError}</p>
                <div className="text-xs space-y-1 mt-2">
                  <p>To fix this:</p>
                  {isLocalMode() ? (
                    <ol className="list-decimal list-inside space-y-0.5 ml-2">
                      <li>
                        Start FastAPI:{' '}
                        <code className="bg-red-100 px-1 rounded">
                          uvicorn main:app --host 0.0.0.0 --port 8000
                        </code>
                      </li>
                      <li>
                        Verify VITE_FASTAPI_URL in .env.local:{' '}
                        <code className="bg-red-100 px-1 rounded">{getFastAPIUrl()}</code>
                      </li>
                    </ol>
                  ) : (
                    <ol className="list-decimal list-inside space-y-0.5 ml-2">
                      <li>Set FASTAPI_URL in your deployment env</li>
                      <li>Ensure FastAPI is publicly accessible (CORS enabled)</li>
                    </ol>
                  )}
                  <button
                    onClick={checkBackendHealth}
                    className="text-xs underline mt-2 hover:no-underline"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Model Tabs */}
        <Tabs defaultValue="vegetation" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="vegetation" className="gap-2">
              <Leaf className="h-4 w-4" />
              Vegetation Segmentation
            </TabsTrigger>
            <TabsTrigger value="soil" className="gap-2">
              <Mountain className="h-4 w-4" />
              Soil Detection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vegetation">
            <VegetationSegmentation />
          </TabsContent>

          <TabsContent value="soil">
            <SoilDetection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600">
            Agricultural Analysis Platform • Powered by YOLOv8 & Machine Learning
          </p>
        </div>
      </footer>
    </div>
  );
}
