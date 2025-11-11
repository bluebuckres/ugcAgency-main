// Blog Data
const blogPosts = [
    {
        id: 1,
        title: "The Creator Brief Template That Gets Results",
        excerpt: "A great creator brief is the difference between mediocre UGC and content that drives sales. Here's the exact template our team uses to brief 120+ creators every month.",
        category: "marketing-tactics",
        readTime: "8 min read",
        author: "Emma Foster",
        date: "December 20, 2024",
        image: "assets/images/illustrations/creator-brief.svg",
        trending: true,
        views: 18250,
        engagement: 9.4,
        url: "blog-creator-brief-template.html"
    },
    {
        id: 2,
        title: "The 3-Second Rule: Why Your Hook Makes or Breaks Conversions",
        excerpt: "Master the psychology of UGC hooks. Learn the 10 proven frameworks that stop the scroll and drive 3.9x better conversion rates in just 3 seconds.",
        category: "ugc-strategy",
        readTime: "9 min read",
        author: "Ryan Mitchell",
        date: "December 18, 2024",
        image: "assets/images/illustrations/hook-attention.svg",
        trending: true,
        views: 31480,
        engagement: 12.7,
        url: "blog-3-second-rule-hooks.html"
    },
    {
        id: 3,
        title: "The 3-Part UGC Hook Formula That Stops the Scroll",
        excerpt: "Discover the psychology-backed formula that increased video completion rates by 340% and turned casual scrollers into engaged customers across 385M Indian Reels users.",
        category: "ugc-strategy",
        readTime: "5 min read",
        author: "Sarah Chen",
        date: "December 15, 2024",
        image: "assets/images/illustrations/creative-hook.svg",
        trending: true,
        views: 24500,
        engagement: 11.4,
        url: "blog-ugc-hook-formula-3-part.html"
    },
    {
        id: 4,
        title: "How We Generated 5.2x ROAS with UGC for an E-commerce Brand",
        excerpt: "Complete case study revealing how a struggling skincare brand transformed from 1.8x to 5.2x ROAS using systematic UGC strategy. Real numbers, actionable frameworks.",
        category: "case-studies",
        readTime: "8 min read",
        author: "Marcus Rodriguez",
        date: "October 3, 2024",
        image: "assets/images/illustrations/roas-growth.svg",
        trending: true,
        views: 32100,
        engagement: 14.2,
        url: "blog-52x-roas-case-study.html"
    },
    {
        id: 5,
        title: "A/B Testing UGC: What Actually Works",
        excerpt: "Complete framework for testing UGC campaigns with 102.4% conversion increases. Real case studies from Mumbai fashion brands and Bangalore beauty companies.",
        category: "analytics",
        readTime: "10 min read",
        author: "David Park",
        date: "November 28, 2024",
        image: "assets/images/illustrations/ab-testing.svg",
        trending: true,
        views: 19420,
        engagement: 8.9,
        url: "blog-ab-testing-ugc-analytics.html"
    },
    {
        id: 6,
        title: "From 0 to 1M Views: Our Creator's Journey",
        excerpt: "Behind-the-scenes story of how we scaled a creator from zero followers to 1M+ views and ₹15L in brand partnerships within 6 months.",
        category: "creator-stories",
        readTime: "7 min read",
        author: "Success Team",
        date: "November 20, 2024",
        image: "assets/images/illustrations/creator-journey.svg",
        trending: false,
        views: 28900,
        engagement: 12.3,
        url: "blog-creator-journey-0-to-1m.html"
    },
    {
        id: 7,
        title: "Why GenZ Creators Outperform Influencers: The Data Speaks",
        excerpt: "Our analysis reveals GenZ creators deliver 6.7x higher ROI than traditional influencers. Comprehensive research study with performance gap analysis.",
        category: "creator-research",
        readTime: "6 min read",
        author: "Data Team",
        date: "November 15, 2024",
        image: "assets/images/illustrations/genz-vs-influencer.svg",
        trending: true,
        views: 31200,
        engagement: 13.8,
        url: "blog-genz-creators-outperform-influencers.html"
    },
    {
        id: 8,
        title: "Instagram Algorithm Update: What Indian Creators Need to Know (Q4 2024)",
        excerpt: "Latest Instagram algorithm changes affecting Indian creators in Q4 2024. Updated strategies to maintain reach, engagement, and monetization opportunities.",
        category: "platform-updates",
        readTime: "8 min read",
        author: "Algorithm Team",
        date: "November 10, 2024",
        image: "assets/images/illustrations/instagram-algorithm.svg",
        trending: false,
        views: 18700,
        engagement: 9.1,
        url: "blog-instagram-algorithm-update-q4-2024.html"
    },
    {
        id: 9,
        title: "Instagram Reels vs YouTube Shorts: Performance Comparison 2025",
        excerpt: "Data-driven comparison of Instagram Reels vs YouTube Shorts for Indian creators in 2025. Which platform delivers better reach, engagement, and monetization?",
        category: "platform-updates",
        readTime: "9 min read",
        author: "Research Team",
        date: "November 5, 2024",
        image: "assets/images/illustrations/reels-vs-shorts.svg",
        trending: false,
        views: 15600,
        engagement: 7.8,
        url: "blog-reels-vs-shorts-2025.html"
    }
];

// Categories for filtering
const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'case-studies', name: 'Case Studies', count: blogPosts.filter(post => post.category === 'case-studies').length },
    { id: 'ugc-strategy', name: 'UGC Strategy', count: blogPosts.filter(post => post.category === 'ugc-strategy').length },
    { id: 'analytics', name: 'Analytics', count: blogPosts.filter(post => post.category === 'analytics').length },
    { id: 'platform-updates', name: 'Platform Updates', count: blogPosts.filter(post => post.category === 'platform-updates').length },
    { id: 'marketing-tactics', name: 'Marketing Tactics', count: blogPosts.filter(post => post.category === 'marketing-tactics').length },
    { id: 'creator-stories', name: 'Creator Stories', count: blogPosts.filter(post => post.category === 'creator-stories').length },
    { id: 'creator-research', name: 'Creator Research', count: blogPosts.filter(post => post.category === 'creator-research').length }
];

// Initialize the blog system
document.addEventListener('DOMContentLoaded', function() {
    renderFilteredPosts();
    renderCategories();
    initializeSearch();
    renderTrendingPosts();
    initializeLiveMetrics();
    initializeLoadMore();
});

// Render blog posts
function renderBlogPosts(posts = blogPosts) {
    const blogContainer = document.getElementById('blogGrid');
    if (!blogContainer) return;
    
    blogContainer.innerHTML = posts.map(post => `
        <article class="blog-card-standard fade-in-up">
            <a href="${post.url}" class="blog-card block rounded-2xl overflow-hidden border border-sage/20 hover:shadow-xl transition-all">
                <div class="relative p-6" style="background: linear-gradient(135deg, #f5f1eb 0%, #e6ddd4 100%);">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-64 object-contain" loading="lazy">
                    ${post.trending ? '<span class="absolute top-4 right-4 bg-rust text-white px-3 py-1 rounded-full text-xs font-semibold">🔥 Trending</span>' : ''}
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-3 mb-3">
                        <span class="text-xs font-medium text-sage uppercase tracking-wide">${post.category.replace('-', ' ')}</span>
                        <span class="text-xs text-charcoal/50">•</span>
                        <span class="text-xs text-charcoal/50">${post.readTime}</span>
                    </div>
                    <h3 class="font-crimson text-xl font-bold text-charcoal mb-3 leading-tight hover:text-sage transition-colors">
                        ${post.title}
                    </h3>
                    <p class="text-sm text-charcoal/70 mb-4 leading-relaxed">${post.excerpt}</p>
                    <div class="flex items-center justify-between text-xs text-charcoal/60 pt-4 border-t border-sage/10">
                        <div class="flex items-center gap-2">
                            <span class="font-medium">${post.author}</span>
                            <span>•</span>
                            <span>${post.date}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span>${post.views.toLocaleString()} views</span>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    `).join('');
}

// Render categories
function renderCategories() {
    // Category buttons already exist in HTML, just add event listeners
    const categoryButtons = document.querySelectorAll('.category-tag');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const selectedCategory = this.dataset.category;
            filterPostsByCategory(selectedCategory);
        });
    });
}

// Filter posts by category
function filterPostsByCategory(categoryId) {
    currentCategory = categoryId;
    postsToShow = 6; // Reset pagination
    renderFilteredPosts();
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        postsToShow = 6; // Reset pagination
        renderFilteredPosts();
    });
}

// Get trending posts
function getTrendingPosts() {
    return blogPosts.filter(post => post.trending).slice(0, 5);
}

// Get latest posts
function getLatestPosts() {
    return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
}

// Get popular posts
function getPopularPosts() {
    return [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 5);
}

// Render trending posts in sidebar
function renderTrendingPosts() {
    const trendingContainer = document.getElementById('trendingPosts');
    if (!trendingContainer) return;
    
    const trendingPosts = getTrendingPosts();
    
    trendingContainer.innerHTML = trendingPosts.map(post => `
        <div class="trending-post">
            <a href="${post.url}" class="block hover:bg-sage/5 p-3 rounded-lg transition-colors">
                <h4 class="font-semibold text-sm mb-2 text-charcoal leading-tight">${post.title}</h4>
                <div class="flex justify-between text-xs text-charcoal/60">
                    <span>${post.readTime}</span>
                    <span>${post.views.toLocaleString()} views</span>
                </div>
            </a>
        </div>
    `).join('');
}

// Initialize live metrics with realistic fluctuations
function initializeLiveMetrics() {
    const totalViewsEl = document.getElementById('totalViews');
    const engagementRateEl = document.getElementById('engagementRate');
    const activeReadersEl = document.getElementById('activeReaders');
    const weeklyGrowthEl = document.getElementById('weeklyGrowth');
    const avgTimeEl = document.getElementById('avgTime');
    const bounceRateEl = document.getElementById('bounceRate');
    const pageViewsEl = document.getElementById('pageViews');
    const readerLocationsEl = document.getElementById('readerLocations');
    
    if (!totalViewsEl || !engagementRateEl || !activeReadersEl) return;
    
    // Starting values with realistic ranges
    let totalViews = 1847293;
    let engagementRate = 12.7;
    let activeReaders = 127;
    let weeklyGrowth = 18.4;
    let avgTimeMinutes = 6;
    let avgTimeSeconds = 47;
    let bounceRate = 31.2;
    let pageViews = 3.8;
    
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat'];
    
    function updateMetrics() {
        // Total views increases gradually (15-45 views per update for realistic growth)
        totalViews += Math.floor(Math.random() * 31) + 15; // +15 to +45
        
        // Engagement rate fluctuates (±0.1-0.3%)
        engagementRate += (Math.random() - 0.5) * 0.6;
        engagementRate = Math.max(11.5, Math.min(14.2, engagementRate)); // Keep between 11.5-14.2%
        
        // Active readers changes more dramatically (±5-15 people)
        activeReaders += Math.floor(Math.random() * 21) - 10; // -10 to +10
        activeReaders = Math.max(85, Math.min(185, activeReaders)); // Keep between 85-185
        
        // Weekly growth fluctuates slightly
        weeklyGrowth += (Math.random() - 0.5) * 0.4;
        weeklyGrowth = Math.max(15.0, Math.min(22.0, weeklyGrowth));
        
        // Average time fluctuates
        avgTimeSeconds += Math.floor(Math.random() * 11) - 5; // -5 to +5 seconds
        if (avgTimeSeconds >= 60) {
            avgTimeMinutes++;
            avgTimeSeconds -= 60;
        } else if (avgTimeSeconds < 0) {
            avgTimeMinutes--;
            avgTimeSeconds += 60;
        }
        avgTimeMinutes = Math.max(5, Math.min(8, avgTimeMinutes));
        avgTimeSeconds = Math.max(0, Math.min(59, avgTimeSeconds));
        
        // Bounce rate fluctuates
        bounceRate += (Math.random() - 0.5) * 0.6;
        bounceRate = Math.max(28.0, Math.min(35.0, bounceRate));
        
        // Page views fluctuates
        pageViews += (Math.random() - 0.5) * 0.2;
        pageViews = Math.max(3.2, Math.min(4.5, pageViews));
        
        // Update reader locations randomly
        const shuffled = cities.sort(() => 0.5 - Math.random());
        const selectedCities = shuffled.slice(0, 3).join(', ') + '...';
        
        // Update display with smooth animations
        animateCounter(totalViewsEl, parseInt(totalViewsEl.textContent.replace(/,/g, '')) || totalViews, totalViews);
        animateCounter(engagementRateEl, parseFloat(engagementRateEl.textContent) || engagementRate, engagementRate, '%', 1);
        animateCounter(activeReadersEl, parseInt(activeReadersEl.textContent) || activeReaders, activeReaders);
        
        if (weeklyGrowthEl) {
            animateCounter(weeklyGrowthEl, parseFloat(weeklyGrowthEl.textContent.replace(/[+%]/g, '')) || weeklyGrowth, weeklyGrowth, '%', 1, '+');
        }
        
        if (avgTimeEl) {
            avgTimeEl.textContent = `${avgTimeMinutes}m ${avgTimeSeconds}s`;
        }
        
        if (bounceRateEl) {
            animateCounter(bounceRateEl, parseFloat(bounceRateEl.textContent.replace('%', '')) || bounceRate, bounceRate, '%', 1);
        }
        
        if (pageViewsEl) {
            animateCounter(pageViewsEl, parseFloat(pageViewsEl.textContent) || pageViews, pageViews, '', 1);
        }
        
        if (readerLocationsEl) {
            readerLocationsEl.textContent = selectedCities;
        }
    }
    
    // Animate counter with smooth transitions
    function animateCounter(element, start, end, suffix = '', decimals = 0, prefix = '') {
        const duration = 800; // 0.8 seconds for faster animation
        const increment = (end - start) / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            
            const displayValue = decimals > 0 ? 
                current.toFixed(decimals) : 
                Math.floor(current).toLocaleString();
            
            element.textContent = prefix + displayValue + suffix;
        }, 16);
    }
    
    // Initial update
    updateMetrics();
    
    // Update every 2-4 seconds with random intervals for quick fluctuations
    function scheduleNextUpdate() {
        const nextUpdate = 2000 + Math.random() * 2000; // 2-4 seconds
        setTimeout(() => {
            updateMetrics();
            scheduleNextUpdate();
        }, nextUpdate);
    }
    
    scheduleNextUpdate();
}

// Load More functionality
let postsToShow = 6; // Initially show 6 posts
let currentCategory = 'all';
let currentSearchQuery = '';

function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        const previousPostCount = document.querySelectorAll('.masonry-item').length;
        postsToShow += 3; // Load 3 more posts each time
        renderFilteredPosts();
        
        // Smooth scroll to first new post after a brief delay for rendering
        setTimeout(() => {
            const allPosts = document.querySelectorAll('.masonry-item');
            if (allPosts[previousPostCount]) {
                allPosts[previousPostCount].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 100);
        
        // Hide button if all posts are shown
        const totalPosts = getFilteredPosts().length;
        if (postsToShow >= totalPosts) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

function getFilteredPosts() {
    let filtered = blogPosts;
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(post => post.category === currentCategory);
    }
    
    // Apply search filter
    if (currentSearchQuery) {
        filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(currentSearchQuery) ||
            post.excerpt.toLowerCase().includes(currentSearchQuery) ||
            post.category.toLowerCase().includes(currentSearchQuery) ||
            post.author.toLowerCase().includes(currentSearchQuery)
        );
    }
    
    return filtered;
}

function renderFilteredPosts() {
    const filtered = getFilteredPosts();
    const postsToDisplay = filtered.slice(0, postsToShow);
    renderBlogPosts(postsToDisplay);
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = postsToShow >= filtered.length ? 'none' : 'block';
    }
}

