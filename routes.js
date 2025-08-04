const Kitchen = {
  template: `
    <div>
      <h2>My Kitchen</h2>
      <ul>
        <li v-for="(desc, food) in recipes" :key="food" @click="selectFood(food)" style="cursor:pointer;">
          {{ food }}
        </li>
      </ul>
      <div v-if="selectedFood">
        <h3>{{ selectedFood }}</h3>
        <p>{{ recipes[selectedFood] }}</p>
        <h4>Reviews</h4>
        <ul>
          <li v-for="review in reviews[selectedFood] || []">{{ review }}</li>
        </ul>
        <input v-model="newReview" placeholder="Write a review" />
        <button @click="addReview">Submit Review</button>
      </div>
    </div>
  `,
  data() {
    return {
      selectedFood: '',
      newReview: '',
      recipes: {
        'Paneer Butter Masala': 'Paneer cubes in tomato-cream gravy, spices, butter.',
        'Veg Biryani': 'Layered rice with spiced vegetables, cooked on dum.',
        'Masala Dosa': 'Crispy dosa with spicy mashed potato filling.',
        'Gulab Jamun': 'Milk solids fried, soaked in sugar syrup.'
      },
      reviews: {}
    };
  },
  methods: {
    selectFood(food) {
      this.selectedFood = food;
      this.loadReviews(food);
    },
    addReview() {
      const text = this.newReview.trim();
      if (text) {
        if (!this.reviews[this.selectedFood]) {
          this.reviews[this.selectedFood] = [];
        }
        this.reviews[this.selectedFood].push(text);
        this.newReview = '';
        this.saveReviews();
      } else {
        alert("Please write a review.");
      }
    },
    saveReviews() {
      localStorage.setItem('kitchenReviews', JSON.stringify(this.reviews));
    },
    loadReviews() {
      const stored = localStorage.getItem('kitchenReviews');
      if (stored) {
        try {
          this.reviews = JSON.parse(stored);
        } catch {
          this.reviews = {};
        }
      }
    }
  },
  mounted() {
    this.loadReviews();
  }
};

const MyRoom = {
  template: `
   <div id="app">


    <h1>📚 Welcome to My Room</h1>

    <h2>Available Books</h2>
    <ul>
      <li v-for="(book, i) in books" :key="i" @click="readBook(book)" class="book">
        {{ book.title }}
      </li>
    </ul>

    <div v-if="selectedStory">
      <h3>📖 Story: {{ selectedStory.title }}</h3>
      <p>{{ selectedStory.story }}</p>
    </div>

    <h3>📩 Request a Book</h3>
    <input v-model="bookRequest" placeholder="Suggest a book name..." />
    <button @click="addRequest">Request</button>

    <ul>
      <li v-for="(req, i) in requests" :key="i">
        {{ i + 1 }}. "{{ req }}"
      </li>
    </ul>

    <h2>🎵 Listen to Songs</h2>
    <ul>
      <li v-for="(song, i) in songs" :key="i" @click="playSong(song.url)" class="song">
        🎶 {{ song.name }}
      </li>
    </ul>

    <audio v-if="currentSong" controls :src="currentSong" autoplay></audio>
  </div>
  `,
  data() {
    return {
      books: [
        { title: "King in Village", story: "Once upon a time, a boy found a clock that could stop time..." },
        { title: "Into Imaginations", story: "In the silence of night, the moon spoke to a lonely traveler..." },
        { title: "The Forgotten Forest", story: "Deep in the forest, memories long lost whispered through trees..." }
      ],
      selectedStory: null,
      bookRequest: '',
      requests: [],
      songs: [
        { name: "Peaceful Night", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { name: "Morning Sun", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
      ],
      currentSong: null
    };
  },
  methods: {
    readBook(book) {
      this.selectedStory = book;
    },
    addRequest() {
      const req = this.bookRequest.trim();
      if (req) {
        this.requests.push(req);
        this.bookRequest = '';
        this.saveRequests();
      } else {
        alert("Please enter a valid book name.");
      }
    },
    saveRequests() {
      localStorage.setItem('roomBookRequests', JSON.stringify(this.requests));
    },
    loadRequests() {
      const data = localStorage.getItem('roomBookRequests');
      if (data) {
        try {
          this.requests = JSON.parse(data);
        } catch {
          this.requests = [];
        }
      }
    },
    playSong(url) {
      this.currentSong = url;
    }
  },
  mounted() {
    this.loadRequests();
  }
};

const TVRoom = {
  template: `
    <div>
      <h1>Welcome to My T.V Room</h1> 

      <p>
        In My T.V Room you can:
        <ul>
          <li>🎬 Watch a Movie <button @click="watchMovie">Play Random</button></li>
          <li>📩 Request a Movie:
            <input v-model="movieRequest" placeholder="Enter movie name" />
            <button @click="addRequest">I Watch Today!</button>
          </li>
          <li>🕹️ Play a Mini-Game <button @click="playGame">Play</button></li>
        </ul>
      </p>

      <h4>Watched Movies with Timestamps</h4>
      <ul>
        <li v-for="(movie, index) in requestedMovies" :key="index">
          {{ index + 1 }}.
          <span class="movie-link" @click="showStory(movie.name)">
            {{ movie.name }}
          </span> — Watched at: {{ movie.timestamp }}
        </li>
      </ul>

      <div v-if="selectedStory" class="story-box">
        <h5>📖 Story: {{ selectedMovieName }}</h5>
        <p>{{ selectedStory }}</p>
        <button @click="selectedStory = '', selectedMovieName = ''">Close</button>
      </div>
    </div>
  `,
  data() {
    return {
      movieRequest: '',
      requestedMovies: [],
      movieSuggestions: ['Inception', 'Avengers', 'The Lion King', 'Interstellar', '3 Idiots'],
      miniGames: ['Guess the Word!', 'Rock Paper Scissors', 'Quick Math Challenge', 'Memory Match'],
      selectedStory: '',
      selectedMovieName: '',
      movieStories: {
        'Inception': 'A skilled thief enters people’s dreams to steal secrets, but a final job challenges his reality.',
        'Avengers': 'Earth’s mightiest heroes unite to battle a global threat and save the world.',
        'The Lion King': 'A young lion prince flees his kingdom after the death of his father and learns the true meaning of leadership.',
        'Interstellar': 'A team of explorers travels through a wormhole to find a new home for humanity.',
        '3 Idiots': 'Three engineering students navigate college life, friendship, and the pressure to succeed while questioning the education system.'
      }
    };
  },
  methods: {
    addRequest() {
      const movie = this.movieRequest.trim();
      if (movie) {
        const timestamp = new Date().toLocaleString();
        this.requestedMovies.push({ name: movie, timestamp });
        this.movieRequest = '';
        this.saveToLocalStorage();
      } else {
        alert('Please enter a movie name.');
      }
    },
    watchMovie() {
      const random = this.movieSuggestions[Math.floor(Math.random() * this.movieSuggestions.length)];
      alert("Now Playing: " + random);
    },
    playGame() {
      const game = this.miniGames[Math.floor(Math.random() * this.miniGames.length)];
      alert("Let's Play: " + game);
    },
    showStory(movieName) {
      this.selectedMovieName = movieName;
      this.selectedStory = this.movieStories[movieName] || "This movie doesn't have a story yet. Stay tuned!";
    },
    saveToLocalStorage() {
      localStorage.setItem('tvRoomRequestedMovies', JSON.stringify(this.requestedMovies));
    },
    loadFromLocalStorage() {
      const stored = localStorage.getItem('tvRoomRequestedMovies');
      if (stored) {
        try {
          this.requestedMovies = JSON.parse(stored);
        } catch (e) {
          console.warn('Corrupted data in localStorage.');
          this.requestedMovies = [];
        }
      }
    }
  },
  mounted() {
    this.loadFromLocalStorage();
  }
};



const Secret = {
  template: `
  <style>
  .movie-link {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
  }
  .story-box {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #aaa;
    background: #f8f9fa;
    border-radius: 8px;
  }
</style>
    <div>
      <h2>Secret Room</h2>
      <label>
        <input type="checkbox" v-model="promiseAccepted" />
        I promise to keep secrets.
      </label>
      <ul v-if="promiseAccepted">
        <li v-for="secret in secrets">{{ secret }}</li>
      </ul>
      <h4>Request a Secret Topic</h4>
      <input v-model="requestText" placeholder="Enter topic" />
      <button @click="addRequest">Request</button>
      <ul>
        <li v-for="req in requests">{{ req }}</li>
      </ul>
    </div>
  `,
  data() {
    let storedPromise = false;
    try {
      storedPromise = JSON.parse(localStorage.getItem('promiseAccepted')) || false;
    } catch (e) {
      storedPromise = false;
    }

    return {
      promiseAccepted: storedPromise,
      secrets: [
        "I still sleep with a night light.",
        "I once cried during a cartoon movie.",
        "I like pineapple on pizza.",
        "I wrote a love letter but never sent it."
      ],
      requestText: '',
      requests: []
    };
  },
  methods: {
    addRequest() {
      const text = this.requestText.trim();
      if (text) {
        this.requests.push(text);
        this.requestText = '';
        this.saveRequests();
      } else {
        alert("Please enter a valid topic.");
      }
    },
    saveRequests() {
      localStorage.setItem('secretRoomRequests', JSON.stringify(this.requests));
    },
    loadRequests() {
      const stored = localStorage.getItem('secretRoomRequests');
      if (stored) {
        try {
          this.requests = JSON.parse(stored);
        } catch {
          this.requests = [];
        }
      }
    }
  },
  watch: {
    promiseAccepted(newVal) {
      localStorage.setItem('promiseAccepted', JSON.stringify(newVal));
    }
  },
  mounted() {
    this.loadRequests();
  }
};

// Router setup
const routes = [
  { path: '/mykitchen', component: Kitchen },
  { path: '/myroom', component: MyRoom },
  { path: '/tvroom', component: TVRoom },
  { path: '/secretroom', component: Secret },
  { path: '/', redirect: '/myroom' }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

// Mount the main app
Vue.createApp({}).use(router).mount('#app');
