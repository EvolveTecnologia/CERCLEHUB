
import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MyTrailScreen from './screens/MyTrailScreen';
import DownloadsScreen from './screens/DownloadsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CourseDetails from './screens/CourseDetails';
import CategoryView from './screens/CategoryView';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import PdfViewerScreen from './screens/PdfViewerScreen';
import AuthScreen from './screens/AuthScreen';
import LandingPage from './screens/LandingPage';
import Preloader from './components/Preloader';
import GeminiStudyAssistant from './components/GeminiStudyAssistant';
import { COURSES } from './constants';
import { Course, Category, Lesson, Material } from './types';

type AppState = 'loading' | 'landing' | 'transition_to_auth' | 'auth' | 'app';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('loading');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  
  // Platform Detection
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobile, setIsMobile] = useState(true); 
  
  // Global Downloads State
  const [downloadedIds, setDownloadedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('educaflix_downloads');
    return saved ? JSON.parse(saved) : [];
  });

  // Global My List (Favorites) State
  const [myListIds, setMyListIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('educaflix_mylist');
    return saved ? JSON.parse(saved) : [];
  });

  // Scroll reset - Garante que a tela carregue do topo ao navegar
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab, selectedCourseId, selectedCategory, selectedLesson, selectedMaterial, appState]);

  useEffect(() => {
    localStorage.setItem('educaflix_downloads', JSON.stringify(downloadedIds));
  }, [downloadedIds]);

  useEffect(() => {
    localStorage.setItem('educaflix_mylist', JSON.stringify(myListIds));
  }, [myListIds]);

  // Initial Load Flow
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('landing');
    }, 3500); 
    return () => clearTimeout(timer);
  }, []);

  // Responsive & Orientation Logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobileBreakpoint = 768; 
      const mobileStatus = width < mobileBreakpoint;
      setIsMobile(mobileStatus);
      setIsLandscape(width > height);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const handleToggleDownload = (id: string) => {
    setDownloadedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRemoveDownload = (id: string) => {
    setDownloadedIds(prev => prev.filter(item => item !== id));
  };

  const handleToggleMyList = (id: string) => {
    setMyListIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCourseClick = (id: string) => {
    setSelectedCourseId(id);
    setSelectedLesson(null);
    setSelectedMaterial(null);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setSelectedCourseId(null);
    setSelectedLesson(null);
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleMaterialClick = (material: Material) => {
    setSelectedMaterial(material);
  };

  const handleLogout = () => {
    setAppState('auth'); // Redireciona para a tela de Login
    setActiveTab('home');
    setSelectedCourseId(null);
    setSelectedCategory(null);
    setSelectedLesson(null);
    setSelectedMaterial(null);
  };

  // Transition from Landing to Auth
  const handleEnterAuth = () => {
    setAppState('transition_to_auth');
    setTimeout(() => {
        setAppState('auth');
    }, 500);
  };

  const handleLogin = () => {
    setAppState('app');
    setActiveTab('home');
  };

  // Logic to handle back navigation in hierarchical views
  const handleBack = () => {
    if (selectedLesson) {
        setSelectedLesson(null);
        return;
    }
    if (selectedMaterial) {
        setSelectedMaterial(null);
        return;
    }
    if (selectedCourseId) {
        // Logica para voltar: Curso -> Categoria -> Home
        const course = COURSES.find(c => c.id === selectedCourseId);
        
        // Se temos um curso e não estamos vindo de uma categoria (ou seja, via home ou busca),
        // vamos para a categoria.
        if (course && !selectedCategory) {
            setSelectedCategory(course.category);
        }
        // Se já estamos filtrados por categoria, ao remover o curso, voltaremos para a view da categoria.
        
        setSelectedCourseId(null);
        return;
    }
    if (selectedCategory) {
        setSelectedCategory(null);
        return;
    }
  };

  const renderContent = () => {
    if (selectedLesson) {
        const course = COURSES.find(c => c.modules?.some(m => m.lessons.some(l => l.id === selectedLesson.id)));
        const module = course?.modules?.find(m => m.lessons.some(l => l.id === selectedLesson.id));
        return (
            <VideoPlayerScreen 
                lesson={selectedLesson} 
                courseTitle={course?.title || ''}
                moduleTitle={module?.title || ''}
                onBack={() => setSelectedLesson(null)} 
            />
        );
    }

    if (selectedMaterial) {
        return (
            <PdfViewerScreen 
                material={selectedMaterial} 
                isDownloaded={downloadedIds.includes(selectedMaterial.id)}
                onDownloadToggle={() => handleToggleDownload(selectedMaterial.id)}
                onBack={() => setSelectedMaterial(null)} 
            />
        );
    }

    if (selectedCourseId) {
        const course = COURSES.find(c => c.id === selectedCourseId);
        if (!course) return null;
        return (
            <CourseDetails 
                course={course} 
                downloadedIds={downloadedIds}
                myListIds={myListIds}
                onBack={handleBack}
                onLessonClick={handleLessonClick}
                onMaterialClick={handleMaterialClick}
                onRemoveDownload={handleRemoveDownload}
                onToggleMyList={handleToggleMyList}
            />
        );
    }

    if (selectedCategory) {
        return (
            <CategoryView 
                category={selectedCategory} 
                onBack={() => setSelectedCategory(null)}
                onCourseClick={handleCourseClick} 
            />
        );
    }

    switch (activeTab) {
        case 'home':
            return (
                <HomeScreen 
                    onCourseClick={handleCourseClick} 
                    onCategoryClick={handleCategoryClick} 
                    myListIds={myListIds}
                    onToggleMyList={handleToggleMyList}
                    onOpenAiTutor={() => setActiveTab('ai-tutor')}
                />
            );
        case 'search':
            return <SearchScreen onCourseClick={handleCourseClick} />;
        case 'ai-tutor':
            return <GeminiStudyAssistant />;
        case 'downloads':
            return <DownloadsScreen downloadedIds={downloadedIds} onRemoveDownload={handleRemoveDownload} onMaterialClick={handleMaterialClick} />;
        case 'trail':
            return <MyTrailScreen />;
        case 'profile':
            return <ProfileScreen onLogout={handleLogout} />;
        default:
            return (
                <HomeScreen 
                    onCourseClick={handleCourseClick} 
                    onCategoryClick={handleCategoryClick} 
                    myListIds={myListIds}
                    onToggleMyList={handleToggleMyList}
                    onOpenAiTutor={() => setActiveTab('ai-tutor')}
                />
            );
    }
  };

  if (appState === 'loading') return <Preloader />;

  if (appState === 'landing' || appState === 'transition_to_auth') {
     return (
        <div className={`transition-opacity duration-500 ${appState === 'transition_to_auth' ? 'opacity-0' : 'opacity-100'}`}>
            <LandingPage onEnter={handleEnterAuth} />
        </div>
     );
  }

  if (appState === 'auth') {
    return <AuthScreen onLogin={handleLogin} onBack={() => setAppState('landing')} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedCourseId(null);
        setSelectedCategory(null);
        setSelectedLesson(null);
        setSelectedMaterial(null);
      }} 
      onLogout={handleLogout}
      isMobile={isMobile}
      hideNav={!!selectedLesson || !!selectedMaterial}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
