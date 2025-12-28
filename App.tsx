
import React, { useState } from 'react';
import { Book, ModalState, NewsItem, ClosedDate, MonthlyFeature, SurveyQuestion } from './types';
import { INITIAL_BOOKS, INITIAL_NEWS, INITIAL_CLOSED_DATES, INITIAL_FEATURE, INITIAL_LIBRARIANS, INITIAL_SURVEY } from './constants';
import { Modal } from './Modal';
import { Header, Footer } from './Layout';
import { CalendarView } from './CalendarView';

// Modals (Root level)
import { AdminModal } from './AdminModal';
import { FeatureModal } from './FeatureModal';
import { NewsDetailModal } from './NewsDetailModal';
import { AccessModal } from './AccessModal';
import { BookDetailModal } from './BookDetailModal';
import { LibrarianModal } from './LibrarianModal';
import { SurveyModal } from './SurveyModal';

import { MapPin, FileText, ArrowRight, MessageCircle, Calendar as CalendarIcon, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [closedDates, setClosedDates] = useState<ClosedDate[]>(INITIAL_CLOSED_DATES);
  const [feature, setFeature] = useState<MonthlyFeature>(INITIAL_FEATURE);
  const [survey, setSurvey] = useState<SurveyQuestion[]>(INITIAL_SURVEY);
  const [modalState, setModalState] = useState<ModalState>({ type: 'NONE' });

  // 予約と「読みたい」の状態管理
  const [reservedBookIds, setReservedBookIds] = useState<string[]>([]);
  const [wantToReadIds, setWantToReadIds] = useState<string[]>([]);

  const openModal = (type: ModalState['type'], data?: any) => setModalState({ type, data });
  const closeModal = () => setModalState({ type: 'NONE' });
  const handleModalNavigate = (type: ModalState['type']) => setModalState({ type, data: undefined });

  // 予約・読みたいのトグル
  const toggleReserve = (bookId: string) => {
    setReservedBookIds(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const toggleWantToRead = (bookId: string) => {
    setWantToReadIds(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] font-serif text-oct-950">
      <Header onOpenModal={openModal} />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] overflow-hidden group cursor-pointer" onClick={() => openModal('FEATURE')}>
        <div className="absolute inset-0 bg-oct-900">
          <img src={feature.imageUrl} alt="Feature" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[30s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-oct-950 via-oct-900/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-end pb-24 text-white">
          <span className="text-xs tracking-[0.5em] mb-4 text-oct-200">SPECIAL FEATURE</span>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-2xl">{feature.title}</h2>
          <p className="text-xl md:text-2xl text-oct-100 max-w-2xl font-light italic border-l-4 border-oct-400 pl-6 py-2">
            {feature.subtitle}
          </p>
          <div className="mt-12">
            <button className="bg-white/10 backdrop-blur-md border border-white/40 text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-oct-900 transition-all shadow-xl flex items-center gap-3">
              特集記事を読む <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-24">
            {/* NEWS */}
            <section>
              <div className="flex justify-between items-end mb-10 border-b border-oct-100 pb-4">
                <h2 className="text-3xl font-bold flex items-center gap-3"><FileText className="text-oct-500" /> 図書館通信</h2>
                <button className="text-xs font-bold text-oct-400 hover:text-oct-900">すべて見る</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {news.map(item => (
                  <div key={item.id} onClick={() => openModal('NEWS_DETAIL', item)} className="group bg-white rounded-2xl p-6 border border-oct-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <time className="text-[10px] font-bold text-oct-400 tracking-widest uppercase">{item.date}</time>
                      {item.pdfUrl && <span className="bg-red-50 text-red-500 text-[10px] px-2 py-1 rounded font-bold border border-red-100">PDF</span>}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-oct-600 leading-snug">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">{item.content.replace(/<[^>]+>/g, '')}</p>
                    <div className="flex items-center gap-2 text-oct-900 text-[10px] font-bold">記事を見る <ArrowRight size={12}/></div>
                  </div>
                ))}
              </div>
            </section>

            {/* RECOMMENDED BOOKS */}
            <section>
              <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><BookOpen className="text-oct-500" /> 今月のおすすめ図書</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {books.filter(b => b.isRecommended).map(book => (
                  <div key={book.id} onClick={() => openModal('BOOK_DETAIL', book)} className="group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md mb-4 group-hover:shadow-2xl transition-all">
                       <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                         {reservedBookIds.includes(book.id) && <span className="text-white text-[9px] font-bold bg-oct-500 px-2 py-0.5 rounded-full">予約済</span>}
                         {wantToReadIds.includes(book.id) && <span className="text-white text-[9px] font-bold bg-red-500 px-2 py-0.5 rounded-full">読みたい</span>}
                         <span className="text-white text-[10px] font-bold border px-3 py-1 rounded-full backdrop-blur-sm">DETAIL</span>
                       </div>
                    </div>
                    <h4 className="font-bold text-sm leading-tight text-oct-900 text-center">{book.title}</h4>
                    <p className="text-[10px] text-gray-400 text-center mt-1">{book.author}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <section>
               <h3 className="font-bold text-sm text-oct-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                 <CalendarIcon size={14} /> Library Calendar
               </h3>
               <CalendarView closedDates={closedDates} />
            </section>

            <div className="space-y-4">
              <button onClick={() => openModal('ACCESS')} className="w-full bg-oct-900 text-white p-6 rounded-2xl flex items-center justify-between hover:bg-oct-800 transition-colors shadow-lg group">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-oct-300 tracking-widest mb-1">STATION DIRECT</p>
                  <p className="text-lg font-bold">アクセス・地図</p>
                </div>
                <MapPin className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button onClick={() => openModal('SURVEY')} className="w-full bg-white border border-oct-100 p-6 rounded-2xl flex items-center justify-between hover:bg-oct-50 transition-colors shadow-sm group">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-oct-400 tracking-widest mb-1">USER VOICE</p>
                  <p className="text-lg font-bold text-oct-900">アンケート</p>
                </div>
                <MessageCircle className="text-oct-500" />
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer onOpenSurvey={() => openModal('SURVEY')} />

      <Modal isOpen={modalState.type !== 'NONE'} onClose={closeModal} onNavigate={handleModalNavigate}>
        {modalState.type === 'ADMIN' && (
          <AdminModal 
            books={books} setBooks={setBooks} 
            news={news} setNews={setNews} 
            closedDates={closedDates} setClosedDates={setClosedDates} 
            feature={feature} setFeature={setFeature} 
            survey={survey} setSurvey={setSurvey} 
          />
        )}
        {modalState.type === 'FEATURE' && (
          <FeatureModal feature={feature} allBooks={books} onBookClick={(book) => openModal('BOOK_DETAIL', book)} />
        )}
        {modalState.type === 'NEWS_DETAIL' && (
          <NewsDetailModal news={modalState.data as NewsItem} />
        )}
        {modalState.type === 'ACCESS' && (
          <AccessModal />
        )}
        {modalState.type === 'BOOK_DETAIL' && (
          <BookDetailModal 
            book={modalState.data as Book} 
            isReserved={reservedBookIds.includes((modalState.data as Book)?.id)}
            isBookmarked={wantToReadIds.includes((modalState.data as Book)?.id)}
            onToggleReserve={() => toggleReserve((modalState.data as Book).id)}
            onToggleBookmark={() => toggleWantToRead((modalState.data as Book).id)}
          />
        )}
        {modalState.type === 'LIBRARIAN' && (
          <LibrarianModal librarians={INITIAL_LIBRARIANS} />
        )}
        {modalState.type === 'SURVEY' && (
          <SurveyModal questions={survey} onSubmit={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default App;
