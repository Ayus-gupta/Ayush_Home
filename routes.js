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
    <div>
      <h2>My Room</h2>
      <ul>
        <li v-for="book in books" @click="readBook(book)" style="cursor:pointer;">{{ book.title }}</li>
      </ul>
      <div v-if="selectedStory">
        <h3>{{ selectedStory.title }}</h3>
        <p>{{ selectedStory.story }}</p>
      </div>
      <h4>Request a Book</h4>
      <input v-model="bookRequest" placeholder="Enter book name" />
      <button @click="addRequest">Request</button>
      <ul>
        <li v-for="req in requests">{{ req }}</li>
      </ul>
      <h4>Songs</h4>
      <ul>
        <li v-for="song in songs" :key="song.url" @click="playSong(song.url)" style="cursor:pointer;">{{ song.name }}</li>
      </ul>
      <audio v-if="currentSong" :src="currentSong" controls autoplay></audio>
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
      <h2>TV Room</h2>
      <label>
        <input type="checkbox" v-model="promiseAccepted" />
        I promise not to spoil the secrets.
      </label>
      <ul v-if="promiseAccepted">
        <li v-for="secret in secrets">{{ secret }}</li>
      </ul>
      <h4>Request a Show Topic</h4>
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
      localStorage.setItem('tvRoomRequests', JSON.stringify(this.requests));
    },
    loadRequests() {
      const stored = localStorage.getItem('tvRoomRequests');
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

const Secret = {
  template: `
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
