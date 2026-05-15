import React, { useState, useEffect } from 'react';
import {
  Home, Lightbulb, Thermometer, ShieldCheck, Fan, Lock, Unlock,
  Sun, Moon, CloudRain, Power, Settings, Bell, Camera, ChevronRight,
  Droplets, Wind, Play, Square, Volume2
} from 'lucide-react';

export default function SmartHomeWallpad() {
  // Current Time State
  const [currentTime, setCurrentTime] = useState(new Date());

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Device States
  const [lights, setLights] = useState({
    livingRoom: { isOn: true, brightness: 80 },
    bedroom: { isOn: false, brightness: 50 },
    kitchen: { isOn: true, brightness: 100 },
    bathroom: { isOn: false, brightness: 100 }
  });

  const [climate, setClimate] = useState({
    currentTemp: 24,
    targetTemp: 22,
    humidity: 45,
    mode: 'cool', // cool, heat, fan, auto
    isOn: true
  });

  const [appliances, setAppliances] = useState({
    airPurifier: { isOn: true, mode: 'auto', filterLife: 85 },
    robotCleaner: { isCleaning: false, battery: 100, status: 'docked' },
    washingMachine: { isRunning: false, remainingTime: 0, phase: 'idle' }
  });

  const [security, setSecurity] = useState({
    mainDoorLocked: true,
    alarmArmed: true,
    lastActivity: '현관문 열림 (2시간 전)'
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });
  };

  // Toggle Handlers
  const toggleLight = (room) => {
    setLights(prev => ({
      ...prev,
      [room]: { ...prev[room], isOn: !prev[room].isOn }
    }));
  };

  const adjustBrightness = (room, value) => {
    setLights(prev => ({
      ...prev,
      [room]: { ...prev[room], brightness: value }
    }));
  };

  const toggleClimatePower = () => {
    setClimate(prev => ({ ...prev, isOn: !prev.isOn }));
  };

  const changeTargetTemp = (amount) => {
    setClimate(prev => ({ ...prev, targetTemp: prev.targetTemp + amount }));
  };

  const toggleDoorLock = () => {
    setSecurity(prev => ({ ...prev, mainDoorLocked: !prev.mainDoorLocked }));
  };

  const toggleAppliance = (device) => {
    if (device === 'airPurifier') {
        setAppliances(prev => ({...prev, airPurifier: {...prev.airPurifier, isOn: !prev.airPurifier.isOn}}));
    } else if (device === 'robotCleaner') {
        setAppliances(prev => ({
            ...prev,
            robotCleaner: {
                ...prev.robotCleaner,
                isCleaning: !prev.robotCleaner.isCleaning,
                status: prev.robotCleaner.isCleaning ? 'returning' : 'cleaning'
            }
        }));
    }
  };


  // --- UI Components ---

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 overflow-y-auto h-full">
      {/* Weather & Time Widget */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-5xl font-light mb-2">{formatTime(currentTime)}</h2>
            <p className="text-indigo-200 text-lg">{formatDate(currentTime)}</p>
          </div>
          <div className="flex items-center space-x-3 text-right">
            <div className="text-right mr-2">
              <p className="text-3xl font-semibold">22°C</p>
              <p className="text-indigo-200 text-sm">맑음, 미세먼지 좋음</p>
            </div>
            <Sun size={48} className="text-yellow-400" />
          </div>
        </div>
        
        <div className="flex space-x-8 mt-8 border-t border-indigo-700/50 pt-6">
           <div className="flex items-center space-x-3">
              <div className="bg-indigo-800/50 p-3 rounded-full"><Thermometer size={24} className="text-blue-300"/></div>
              <div>
                 <p className="text-sm text-indigo-200">실내 온도</p>
                 <p className="text-xl font-semibold">{climate.currentTemp}°C</p>
              </div>
           </div>
           <div className="flex items-center space-x-3">
              <div className="bg-indigo-800/50 p-3 rounded-full"><Droplets size={24} className="text-cyan-300"/></div>
              <div>
                 <p className="text-sm text-indigo-200">실내 습도</p>
                 <p className="text-xl font-semibold">{climate.humidity}%</p>
              </div>
           </div>
        </div>
      </div>

      {/* Quick Controls */}
      <div className="bg-slate-800 rounded-3xl p-6 shadow-lg flex flex-col">
        <h3 className="text-lg font-medium text-slate-200 mb-4 flex items-center"><Lightbulb size={20} className="mr-2 text-yellow-500" /> 빠른 제어</h3>
        <div className="grid grid-cols-2 gap-4 flex-grow">
          {Object.entries(lights).map(([room, state]) => (
            <button
              key={room}
              onClick={() => toggleLight(room)}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                state.isOn 
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                  : 'bg-slate-700/50 border border-transparent text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Lightbulb size={28} className="mb-2" />
              <span className="text-sm font-medium">
                {room === 'livingRoom' ? '거실' : room === 'bedroom' ? '침실' : room === 'kitchen' ? '주방' : '욕실'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Security Summary */}
      <div className="bg-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-200 flex items-center"><ShieldCheck size={20} className="mr-2 text-green-400" /> 보안 상태</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${security.alarmArmed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {security.alarmArmed ? '방범 설정됨' : '방범 해제됨'}
            </span>
         </div>
         
         <div className="bg-slate-700/50 rounded-2xl p-5 flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${security.mainDoorLocked ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`}>
                    {security.mainDoorLocked ? <Lock size={24} /> : <Unlock size={24} />}
                </div>
                <div>
                    <p className="text-slate-200 font-medium">현관문 도어락</p>
                    <p className="text-sm text-slate-400">{security.mainDoorLocked ? '잠김' : '열림'}</p>
                </div>
            </div>
            <button 
                onClick={toggleDoorLock}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors text-sm font-medium"
            >
                {security.mainDoorLocked ? '열기' : '잠그기'}
            </button>
         </div>
         <p className="text-xs text-slate-500">최근 활동: {security.lastActivity}</p>
      </div>

       {/* Appliances Summary */}
       <div className="bg-slate-800 rounded-3xl p-6 shadow-lg col-span-1 md:col-span-2 lg:col-span-2">
        <h3 className="text-lg font-medium text-slate-200 mb-4 flex items-center"><Power size={20} className="mr-2 text-purple-400" /> 가전 상태</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Air Purifier */}
            <div className={`p-5 rounded-2xl border transition-all ${appliances.airPurifier.isOn ? 'bg-purple-900/20 border-purple-500/30' : 'bg-slate-700/30 border-transparent'}`}>
                <div className="flex justify-between items-start mb-4">
                    <Wind size={28} className={appliances.airPurifier.isOn ? 'text-purple-400 animate-pulse' : 'text-slate-500'} />
                    <button onClick={() => toggleAppliance('airPurifier')} className={`w-12 h-6 rounded-full p-1 transition-colors ${appliances.airPurifier.isOn ? 'bg-purple-500' : 'bg-slate-600'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${appliances.airPurifier.isOn ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
                <h4 className="text-slate-200 font-medium">공기청정기</h4>
                <p className="text-sm text-slate-400 mt-1">{appliances.airPurifier.isOn ? `작동 중 (${appliances.airPurifier.mode})` : '꺼짐'}</p>
                <div className="mt-4 w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-green-400 h-1.5 rounded-full" style={{ width: `${appliances.airPurifier.filterLife}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1 text-right">필터 {appliances.airPurifier.filterLife}%</p>
            </div>

            {/* Robot Cleaner */}
             <div className={`p-5 rounded-2xl border transition-all ${appliances.robotCleaner.isCleaning ? 'bg-blue-900/20 border-blue-500/30' : 'bg-slate-700/30 border-transparent'}`}>
                <div className="flex justify-between items-start mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-7 h-7 ${appliances.robotCleaner.isCleaning ? 'text-blue-400' : 'text-slate-500'}`}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                    </svg>
                    <button onClick={() => toggleAppliance('robotCleaner')} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 text-slate-300">
                        {appliances.robotCleaner.isCleaning ? <Square size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                    </button>
                </div>
                <h4 className="text-slate-200 font-medium">로봇청소기</h4>
                <p className="text-sm text-slate-400 mt-1">{appliances.robotCleaner.status === 'docked' ? '충전 중' : appliances.robotCleaner.status === 'cleaning' ? '청소 중' : '복귀 중'}</p>
                <div className="mt-4 flex items-center space-x-2 text-xs text-slate-500">
                    <BatteryIcon level={appliances.robotCleaner.battery} />
                    <span>{appliances.robotCleaner.battery}%</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderLighting = () => (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-light text-slate-100 mb-6">조명 제어</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(lights).map(([room, state]) => (
          <div key={room} className="bg-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between border border-slate-700/50">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                 <div className={`p-4 rounded-2xl ${state.isOn ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}`}>
                    <Lightbulb size={32} />
                 </div>
                 <div>
                    <h3 className="text-xl font-medium text-slate-200">
                        {room === 'livingRoom' ? '거실 조명' : room === 'bedroom' ? '침실 조명' : room === 'kitchen' ? '주방 조명' : '욕실 조명'}
                    </h3>
                    <p className="text-slate-400">{state.isOn ? '켜짐' : '꺼짐'}</p>
                 </div>
              </div>
              <button onClick={() => toggleLight(room)} className={`w-14 h-8 rounded-full p-1 transition-colors ${state.isOn ? 'bg-amber-500' : 'bg-slate-600'}`}>
                  <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${state.isOn ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <div className={`transition-opacity duration-300 ${state.isOn ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
               <div className="flex justify-between text-sm text-slate-400 mb-2">
                   <span>밝기</span>
                   <span>{state.brightness}%</span>
               </div>
               <input 
                  type="range" 
                  min="0" max="100" 
                  value={state.brightness} 
                  onChange={(e) => adjustBrightness(room, parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
               />
               <div className="flex justify-between mt-6">
                  {['휴식', '독서', '영화', '기본'].map(preset => (
                      <button key={preset} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm text-slate-300 transition-colors">
                          {preset}
                      </button>
                  ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderClimate = () => (
     <div className="p-6 h-full overflow-y-auto flex flex-col items-center">
         <h2 className="text-2xl font-light text-slate-100 mb-8 self-start">냉난방 제어</h2>
         
         <div className="w-full max-w-2xl bg-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
            {/* Background Gradient based on mode */}
            <div className={`absolute inset-0 opacity-20 transition-colors duration-1000 ${
                climate.isOn 
                    ? climate.mode === 'cool' ? 'bg-gradient-to-b from-blue-500 to-transparent' 
                    : climate.mode === 'heat' ? 'bg-gradient-to-b from-orange-500 to-transparent'
                    : 'bg-gradient-to-b from-emerald-500 to-transparent'
                : 'bg-transparent'
            }`} />

            <div className="relative z-10 flex flex-col items-center">
                <div className="flex justify-between w-full items-center mb-10">
                    <span className="text-slate-400 text-lg font-medium">거실 에어컨</span>
                    <button onClick={toggleClimatePower} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${climate.isOn ? 'bg-slate-700 text-red-400 shadow-[0_0_20px_rgba(248,113,113,0.3)]' : 'bg-slate-700 text-green-400'}`}>
                        <Power size={32} />
                    </button>
                </div>

                {/* Temperature Circle */}
                <div className={`w-72 h-72 rounded-full flex flex-col items-center justify-center relative transition-opacity duration-500 ${climate.isOn ? 'opacity-100' : 'opacity-30'}`}>
                    {/* Ring */}
                    <div className="absolute inset-0 border-[12px] border-slate-700 rounded-full" />
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="44" fill="none" stroke={climate.mode === 'cool' ? '#3b82f6' : '#f97316'} strokeWidth="12" strokeDasharray="276" strokeDashoffset={276 - (276 * (climate.targetTemp - 16) / 14)} className="transition-all duration-1000 ease-out" />
                    </svg>

                    <span className="text-slate-400 text-sm mb-1 uppercase tracking-widest">목표 온도</span>
                    <div className="flex items-start">
                        <span className="text-7xl font-light text-white">{climate.targetTemp}</span>
                        <span className="text-3xl text-slate-400 mt-2">°</span>
                    </div>
                    <span className="text-slate-400 text-sm mt-4">현재 온도 {climate.currentTemp}°C</span>
                </div>

                {/* Controls */}
                <div className={`flex items-center space-x-12 mt-12 transition-opacity duration-500 ${climate.isOn ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                    <button onClick={() => changeTargetTemp(-1)} className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-slate-600 transition-colors shadow-md">
                        <span className="text-3xl font-light">-</span>
                    </button>
                    
                    <div className="flex space-x-4">
                        <button onClick={() => setClimate({...climate, mode: 'cool'})} className={`p-4 rounded-2xl transition-all ${climate.mode === 'cool' ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                            <Wind size={28} />
                        </button>
                        <button onClick={() => setClimate({...climate, mode: 'heat'})} className={`p-4 rounded-2xl transition-all ${climate.mode === 'heat' ? 'bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                            <Sun size={28} />
                        </button>
                        <button onClick={() => setClimate({...climate, mode: 'auto'})} className={`p-4 rounded-2xl transition-all ${climate.mode === 'auto' ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                            <Fan size={28} />
                        </button>
                    </div>

                    <button onClick={() => changeTargetTemp(1)} className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-slate-600 transition-colors shadow-md">
                        <span className="text-3xl font-light">+</span>
                    </button>
                </div>
            </div>
         </div>
     </div>
  );


  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-slate-200">
      
      {/* Sidebar Navigation */}
      <nav className="w-24 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between py-8 transition-all duration-300">
        <div>
          <div className="flex items-center justify-center lg:justify-start lg:px-8 mb-12">
            <div className="bg-indigo-600 p-2 rounded-xl">
               <Home size={28} className="text-white" />
            </div>
            <span className="hidden lg:block ml-4 text-xl font-semibold tracking-wide text-white">LEESCUE</span>
          </div>

          <ul className="space-y-4 px-4">
            {[
              { id: 'dashboard', icon: <Home size={24} />, label: '대시보드' },
              { id: 'lighting', icon: <Lightbulb size={24} />, label: '조명 제어' },
              { id: 'climate', icon: <Thermometer size={24} />, label: '냉난방' },
              { id: 'security', icon: <Camera size={24} />, label: '보안/CCTV' },
              { id: 'appliances', icon: <Power size={24} />, label: '가전 관리' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-center lg:justify-start px-4 py-4 lg:py-3 rounded-2xl transition-all duration-200 group relative ${
                    activeTab === item.id 
                      ? 'bg-indigo-600/10 text-indigo-400' 
                      : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                  }`}
                >
                  <span className={`transition-transform duration-200 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                     {item.icon}
                  </span>
                  <span className="hidden lg:block ml-4 font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-500 rounded-r-full hidden lg:block" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4">
           <button className="w-full flex items-center justify-center lg:justify-start px-4 py-4 rounded-2xl text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-colors">
              <Settings size={24} />
              <span className="hidden lg:block ml-4 font-medium">설정</span>
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0B1120]">
        
        {/* Top Header */}
        <header className="h-20 flex justify-between items-center px-8 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md">
           <div className="flex items-center">
              <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">LEESCUE SMART HOME</span>
           </div>
           <div className="flex items-center space-x-6">
              <div className="flex items-center bg-slate-800 rounded-full px-4 py-2 border border-slate-700">
                 <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                 <span className="text-sm font-medium text-slate-300">네트워크 연결됨</span>
              </div>
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                  <Bell size={24} />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-slate-900 rounded-full" />
              </button>
           </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden relative">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'lighting' && renderLighting()}
            {activeTab === 'climate' && renderClimate()}
            {activeTab === 'security' && (
                <div className="p-6 flex flex-col h-full items-center justify-center text-slate-500">
                    <Camera size={64} className="mb-4 opacity-50" />
                    <h2 className="text-2xl font-light text-slate-300 mb-2">CCTV 및 보안 설정</h2>
                    <p>카메라 피드를 불러오는 중입니다...</p>
                </div>
            )}
             {activeTab === 'appliances' && (
                <div className="p-6 flex flex-col h-full items-center justify-center text-slate-500">
                    <Power size={64} className="mb-4 opacity-50" />
                    <h2 className="text-2xl font-light text-slate-300 mb-2">상세 가전 관리</h2>
                    <p>가전 네트워크 스캔 중...</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}

// Helper component for battery icon
const BatteryIcon = ({ level }) => {
    return (
        <div className="relative w-6 h-3 border border-slate-500 rounded-sm p-0.5">
            <div className={`h-full bg-slate-400 rounded-sm`} style={{ width: `${level}%` }} />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0.5 h-1.5 bg-slate-500" />
        </div>
    )
}