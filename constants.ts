
import { Book, ClosedDate, Librarian, MonthlyFeature, NewsItem, SurveyQuestion } from "./types";

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: '静寂の森',
    author: '佐藤 かおり',
    description: '都会の喧騒を離れ、森の中で見つけた本当の自分。心温まる再生の物語。',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400',
    category: '小説',
    isNew: true,
    isRecommended: false
  },
  {
    id: '2',
    title: '未来への建築',
    author: 'James Wright',
    description: '持続可能な都市開発と、これからの建築家が果たすべき役割について。',
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400',
    category: '技術',
    isNew: true,
    isRecommended: true
  },
  {
    id: '3',
    title: '忘れられたレシピ',
    author: '祖母山 ツネ',
    description: '昭和の食卓を彩った、懐かしくも新しい家庭料理の数々。',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400',
    category: '料理',
    isNew: false,
    isRecommended: true
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    date: '2024-05-15',
    title: '図書館通信 5月号',
    content: '<div class="rt-h1-style">薫風香る、読書の季節</div><p>今月号では、新しく導入された電子書籍端末の使い方を特集しています。</p><div class="rt-box-info">5月20日は館内整理のため17時閉館となります。</div>',
    fileName: 'oct_news_2024_05.pdf',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=400'
  }
];

export const INITIAL_CLOSED_DATES: ClosedDate[] = [
  { id: 'c1', date: '2024-05-13', reason: '館内整理日' },
  { id: 'c2', date: '2024-05-27', reason: '特別整理期間' }
];

export const INITIAL_FEATURE: MonthlyFeature = {
  title: '珈琲と本',
  subtitle: '香り豊かな読書時間',
  description: '深まる季節、温かいコーヒーを片手にページをめくる至福のひとときをご提案します。',
  content: '<div class="rt-h2-style">一杯のコーヒーから始まる物語</div><p>かつて文豪たちは喫茶店で名作を書き上げました。本特集では、珈琲の歴史から美味しい淹れ方、そして喫茶店が舞台の小説まで幅広くご紹介します。</p><div class="rt-box-quote">「コーヒーは、地獄のように黒く、死のように強く、恋のように甘い。」</div><div class="rt-box-cinema">★ 特設コーナーにて、バリスタ厳選の豆を展示中 ★</div>',
  imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200',
  books: ['3', '1']
};

export const INITIAL_LIBRARIANS: Librarian[] = [
  {
    name: '本田 栞',
    role: '館長',
    message: '本との出会いは、新しい世界への扉です。皆様の「知りたい」を全力でサポートします。',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200'
  }
];

export const INITIAL_SURVEY: SurveyQuestion[] = [
  { id: 'q1', text: '図書館の利用頻度はどれくらいですか？', type: 'choice' }
];
