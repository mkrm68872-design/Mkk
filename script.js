(function() {
    const VALID_CODE = '1234';
    const VALID_PASSWORD = '1234';

    // Anti-copy & screenshot
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'PrintScreen' ||
            (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 'u' || e.key === 's')) ||
            e.key === 'F12'
        ) {
            e.preventDefault();
            return false;
        }
    });
    document.addEventListener('copy', (e) => e.preventDefault());
    document.addEventListener('cut', (e) => e.preventDefault());
    document.addEventListener('paste', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    window.addEventListener('blur', () => { document.body.style.opacity = '0.5'; });
    window.addEventListener('focus', () => { document.body.style.opacity = '1'; });

    // Single article: الزمن والوعي والمنظور الكوني
    const articles = [
        {
            id: 1,
            title: 'الزمن والوعي والمنظور الكوني',
            content: `الزمن والوعي والمنظور الكوني

1. وهم الزمن
تخيل أنك تستيقظ في الصباح، تحضر قهوتك، وتخطط ليومك. بالنسبة لك، الزمن خطي: الماضي → الحاضر → المستقبل. لكن الفيزياء الحديثة تقول شيئًا مختلفًا.
نظرية النسبية لألبرت أينشتاين تظهر أن الزمان والمكان ليسا كيانين منفصلين، بل يشكلان نسيجًا واحدًا يُعرف باسم الزمكان. في هذا الإطار، كل اللحظات — الماضي والحاضر والمستقبل — موجودة معًا، مثل لوحة كونية ضخمة. إحساسنا بالتحرك عبر الزمن هو مجرد وعينا يسير على خيط واحد من التجربة.

قصة توضيحية:
تخيل مكتبة. كل كتاب يمثل لحظة في حياتك. بالنسبة لك، تفتح كتابًا واحدًا في كل مرة (لحظتك الحالية). لكن كل الكتب — ذكريات الماضي وإمكانيات المستقبل — موجودة في نفس المكتبة، وأنت فقط لا تستطيع قراءتها كلها دفعة واحدة.

2. المعرفة، الحرية، والمنظور الإلهي
في الفلسفة والدين، هناك مفارقة مثيرة:
في الإسلام، الله يعلم المستقبل، ومع ذلك الإنسان مخَيّر في أفعاله.
من منظورنا البشري، المستقبل مجهول، لكنه موجود ضمن “مكتبة كونية” شاملة كل اللحظات.

قصة توضيحية:
تخيل لاعب شطرنج محترف يراقب مباراة شخص آخر. المحترف يرى كل حركة ونتائجها مسبقًا. لكن اللاعب لا يزال يختار حركاته بحرية. علم المحترف لا يجبر اللاعب على الاختيار؛ إنه مجرد رؤية لما سيحدث بالفعل.

3. المنظور الكوني والوعي البشري
إذا كان الزمكان كتلة واحدة ثابتة، فما معنى "الآن"؟ الفيزيائيون يعتقدون أن كل لحظة موجودة بنفس الدرجة من الحقيقة. وعينا هو الذي يخلق إحساس التدفق الزمني. بعض الفلاسفة يقارنون ذلك بفيلم سينمائي: كل الإطارات موجودة على الشريط، لكن العرض يمر عليها واحدًا تلو الآخر.

هذا يقودنا إلى فكرة أن المستقبل ليس مكتوبًا بشكل حتمي بالمعنى التقليدي، لكنه موجود في مكان ما خارج إدراكنا. الاختيارات التي نتخذها "تحدد" المسار الذي نسلكه عبر الزمكان، لكن جميع المسارات موجودة في المشهد الكوني.

4. تطبيقات في الفيزياء والفلسفة
نظرية الكم تزيد الأمور تعقيدًا: الجسيمات لا توجد في حالة محددة حتى يتم قياسها. هل يمكن للوعي أن يلعب دورًا في تحديد الواقع؟ بعض العلماء يعتقدون أن الملاحظة الواعية تؤثر على الحالة الكمومية، مما يربط الوعي بنسيج الزمكان نفسه.

في الفلسفة الإسلامية، يرى ابن سينا وابن رشد أن العلم الإلهي شامل لكل الأزمنة، لكنه لا ينفي حرية الإرادة. الله يعلم الاختيار الذي سنقوم به، لكننا نحن من نختاره.

5. الخلاصة
الزمن كما نعرفه قد يكون وهمًا ناتجًا عن محدودية وعينا. بينما تشير الفيزياء الحديثة إلى أن الكون كتلة واحدة متكاملة، تظل علاقتنا بالزمن لغزًا يربط بين العلم والدين والفلسفة. إحساسنا بالماضي والحاضر والمستقبل قد يكون مجرد طريقة لتنظيم تجربتنا في هذا الكون الواسع.`
        }
    ];

    // State
    let currentArticle = null;
    let fontSize = 1.3;
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    let comments = JSON.parse(localStorage.getItem('comments')) || {};
    let lastRead = JSON.parse(localStorage.getItem('lastRead')) || {};
    let highlights = JSON.parse(localStorage.getItem('highlights')) || {};

    // DOM elements
    const loginSection = document.getElementById('loginSection');
    const mainSection = document.getElementById('mainSection');
    const loginBtn = document.getElementById('loginBtn');
    const codeInput = document.getElementById('codeInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');

    const titlesContainer = document.getElementById('titlesContainer');
    const readerSection = document.getElementById('readerSection');
    const backToLibraryBtn = document.getElementById('backToLibraryBtn');
    const backToLibraryBtn2 = document.getElementById('backToLibraryBtn2');
    const focusBackBtn = document.getElementById('focusBackBtn');
    const readerTitle = document.getElementById('readerTitle');
    const readerContent = document.getElementById('readerContent');
    const decreaseFont = document.getElementById('decreaseFont');
    const increaseFont = document.getElementById('increaseFont');
    const fontPercent = document.getElementById('fontPercent');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const focusToggle = document.getElementById('focusToggle');
    const sidebar = document.getElementById('sidebar');
    const bookmarkList = document.getElementById('bookmarkList');
    const addBookmarkBtn = document.getElementById('addBookmarkBtn');
    const tocList = document.getElementById('tocList');
    const commentInput = document.getElementById('commentInput');
    const addCommentBtn = document.getElementById('addCommentBtn');
    const commentsList = document.getElementById('commentsList');

    // Helper functions
    function countWords(str) {
        return str.split(/\s+/).filter(w => w.length > 0).length;
    }

    function renderTitles() {
        titlesContainer.innerHTML = '';
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'title-card';
            card.setAttribute('data-id', article.id);
            const wordCount = countWords(article.content);
            card.innerHTML = `
                <h3>${article.title}</h3>
                <div class="title-meta">
                    <span>${wordCount} words</span>
                    <span class="word-badge">read</span>
                </div>
            `;
            card.addEventListener('click', () => openArticle(article));
            titlesContainer.appendChild(card);
        });
    }

    function renderBookmarks() {
        if (!currentArticle) return;
        const articleBookmarks = bookmarks[currentArticle.id] || [];
        bookmarkList.innerHTML = '';
        articleBookmarks.forEach((bm, index) => {
            const li = document.createElement('li');
            li.className = 'bookmark-item';
            li.innerHTML = `
                <span>${bm.text.substring(0, 30)}...</span>
                <button class="remove-bookmark" data-index="${index}">✕</button>
            `;
            li.querySelector('.remove-bookmark').addEventListener('click', (e) => {
                e.stopPropagation();
                articleBookmarks.splice(index, 1);
                bookmarks[currentArticle.id] = articleBookmarks;
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                renderBookmarks();
            });
            li.addEventListener('click', () => {
                readerContent.scrollTop = bm.scroll;
            });
            bookmarkList.appendChild(li);
        });
    }

    function renderTOC(content) {
        const lines = content.split('\n');
        const headings = [];
        lines.forEach((line, index) => {
            if (line.match(/^[0-9]+\.\s/) && line.trim().length > 0) {
                headings.push({ text: line.trim(), position: index });
            }
        });
        tocList.innerHTML = '';
        headings.forEach(h => {
            const li = document.createElement('li');
            li.textContent = h.text;
            li.addEventListener('click', () => {
                const targetLine = h.position;
                const lines = readerContent.textContent.split('\n');
                let offset = 0;
                for (let i = 0; i < targetLine; i++) {
                    offset += lines[i].length * 0.5;
                }
                readerContent.scrollTop = offset * 10;
            });
            tocList.appendChild(li);
        });
    }

    function renderComments() {
        if (!currentArticle) return;
        const articleComments = comments[currentArticle.id] || [];
        commentsList.innerHTML = '';
        articleComments.forEach((c, index) => {
            const div = document.createElement('div');
            div.className = 'comment-item';
            div.innerHTML = `
                <span>${c.text}</span>
                <button class="delete-comment" data-index="${index}">✕</button>
            `;
            div.querySelector('.delete-comment').addEventListener('click', () => {
                articleComments.splice(index, 1);
                comments[currentArticle.id] = articleComments;
                localStorage.setItem('comments', JSON.stringify(comments));
                renderComments();
            });
            commentsList.appendChild(div);
        });
    }

    function addComment() {
        if (!currentArticle) return;
        const text = commentInput.value.trim();
        if (!text) return;
        if (!comments[currentArticle.id]) comments[currentArticle.id] = [];
        comments[currentArticle.id].push({ text, date: new Date().toISOString() });
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = '';
        renderComments();
    }

    function addBookmark() {
        if (!currentArticle) return;
        const scroll = readerContent.scrollTop;
        const text = readerContent.textContent.substring(scroll, scroll + 100).trim();
        if (!bookmarks[currentArticle.id]) bookmarks[currentArticle.id] = [];
        bookmarks[currentArticle.id].push({ text, scroll });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        renderBookmarks();
    }

    function applyFontSize() {
        if (readerContent) {
            readerContent.style.fontSize = fontSize + 'rem';
        }
    }

    function updateFontPercent() {
        const percent = Math.round((fontSize / 1.3) * 100);
        fontPercent.textContent = percent + '%';
    }

    // Highlight functions
    function getWordAtClick(event) {
        const range = document.caretRangeFromPoint(event.clientX, event.clientY);
        if (!range) return null;
        range.expand('word');
        return range;
    }

    function addHighlightFromClick(event) {
        if (!currentArticle) return;
        const range = getWordAtClick(event);
        if (!range) return;
        const start = range.startOffset;
        const end = range.endOffset;
        const text = range.toString().trim();
        if (!text) return;

        if (!highlights[currentArticle.id]) highlights[currentArticle.id] = [];
        const exists = highlights[currentArticle.id].some(h => h.start === start && h.end === end);
        if (!exists) {
            highlights[currentArticle.id].push({ start, end, text });
            highlights[currentArticle.id].sort((a,b) => a.start - b.start);
            localStorage.setItem('highlights', JSON.stringify(highlights));
            applyHighlightsToContent();
        }
    }

    function removeHighlight(start, end) {
        if (!currentArticle) return;
        const articleHighlights = highlights[currentArticle.id] || [];
        const index = articleHighlights.findIndex(h => h.start === start && h.end === end);
        if (index !== -1) {
            articleHighlights.splice(index, 1);
            highlights[currentArticle.id] = articleHighlights;
            localStorage.setItem('highlights', JSON.stringify(highlights));
            applyHighlightsToContent();
        }
    }

    function applyHighlightsToContent() {
        if (!currentArticle) return;
        const originalText = currentArticle.content;
        const articleHighlights = highlights[currentArticle.id] || [];

        if (articleHighlights.length === 0) {
            readerContent.textContent = originalText;
            readerContent.style.fontSize = fontSize + 'rem';
            return;
        }

        let result = '';
        let lastIndex = 0;
        articleHighlights.forEach(h => {
            result += escapeHtml(originalText.substring(lastIndex, h.start));
            const word = originalText.substring(h.start, h.end);
            result += `<span class="highlighted-word" data-start="${h.start}" data-end="${h.end}">${escapeHtml(word)}</span>`;
            lastIndex = h.end;
        });
        result += escapeHtml(originalText.substring(lastIndex));

        readerContent.innerHTML = result;
        readerContent.style.fontSize = fontSize + 'rem';

        document.querySelectorAll('.highlighted-word').forEach(span => {
            span.addEventListener('click', (e) => {
                e.stopPropagation();
                const start = parseInt(span.dataset.start);
                const end = parseInt(span.dataset.end);
                removeHighlight(start, end);
            });
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Navigation
    function showLibrary() {
        if (currentArticle) {
            lastRead[currentArticle.id] = readerContent.scrollTop;
            localStorage.setItem('lastRead', JSON.stringify(lastRead));
        }
        readerSection.classList.add('hidden');
        sidebar.classList.add('hidden');
        document.querySelector('.library-header').classList.remove('hidden');
        titlesContainer.classList.remove('hidden');
        currentArticle = null;
    }

    function showReader(article) {
        currentArticle = article;
        readerTitle.textContent = article.title;
        applyHighlightsToContent();

        if (lastRead[article.id]) {
            setTimeout(() => {
                readerContent.scrollTop = lastRead[article.id];
            }, 100);
        } else {
            const articleHighlights = highlights[article.id] || [];
            if (articleHighlights.length > 0) {
                setTimeout(() => {
                    const estimatedScroll = articleHighlights[0].start * 0.5;
                    readerContent.scrollTop = estimatedScroll;
                }, 150);
            }
        }

        renderBookmarks();
        renderTOC(article.content);
        renderComments();

        document.querySelector('.library-header').classList.add('hidden');
        titlesContainer.classList.add('hidden');
        readerSection.classList.remove('hidden');
        sidebar.classList.remove('hidden');
    }

    function openArticle(article) {
        showReader(article);
    }

    function closeReader() {
        showLibrary();
    }

    // Click on text to add highlight
    readerContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('highlighted-word')) return;
        addHighlightFromClick(e);
    });

    // Event listeners
    loginBtn.addEventListener('click', () => {
        if (codeInput.value === VALID_CODE && passwordInput.value === VALID_PASSWORD) {
            loginSection.classList.add('hidden');
            mainSection.classList.remove('hidden');
            loginError.classList.add('hidden');
            codeInput.value = '';
            passwordInput.value = '';
        } else {
            loginError.classList.remove('hidden');
        }
    });

    [codeInput, passwordInput].forEach(inp => {
        inp.addEventListener('keypress', e => {
            if (e.key === 'Enter') loginBtn.click();
        });
        inp.addEventListener('input', () => loginError.classList.add('hidden'));
    });

    backToLibraryBtn.addEventListener('click', closeReader);
    backToLibraryBtn2.addEventListener('click', closeReader);
    focusBackBtn.addEventListener('click', closeReader);

    decreaseFont.addEventListener('click', () => {
        if (fontSize > 0.8) {
            fontSize = Math.max(0.8, fontSize - 0.1);
            applyFontSize();
            updateFontPercent();
        }
    });

    increaseFont.addEventListener('click', () => {
        if (fontSize < 2.5) {
            fontSize = Math.min(2.5, fontSize + 0.1);
            applyFontSize();
            updateFontPercent();
        }
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    focusToggle.addEventListener('click', () => {
        document.body.classList.toggle('focus-mode');
        focusToggle.textContent = document.body.classList.contains('focus-mode') ? 'Exit Focus' : 'Focus';
    });

    addBookmarkBtn.addEventListener('click', addBookmark);
    addCommentBtn.addEventListener('click', addComment);

    // Initialize
    renderTitles();
})();