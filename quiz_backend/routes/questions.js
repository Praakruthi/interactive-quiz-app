// routes/questions.js
import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

/* 
===========================================
  GET: 15 random questions for a domain
===========================================
*/
// ✅ Fetch 15 random questions by domain
router.get("/:domain", async (req, res) => {
  try {
    const domain = req.params.domain;

    // Check how many questions exist for this domain
    const count = await Question.countDocuments({ domain });
    
    if (count === 0) {
      return res.status(404).json({ 
        message: `No questions found for domain: ${domain}. Please seed the database first by calling POST /api/questions/seed`
      });
    }

    // Fetch all questions if less than 15, otherwise fetch 15 random
    const sampleSize = Math.min(15, count);
    const questions = await Question.aggregate([
      { $match: { domain } },
      { $sample: { size: sampleSize } }
    ]);

    res.json({ questions });
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err.message });
  }
});


/* 
===========================================
  POST: Seed questions (50 per domain)
  Use once — then comment/remove.
===========================================
*/
router.post("/seed", async (req, res) => {
  try {
    const sampleQuestions = [
      /* 🏛 Indian History (50 questions) */
      { domain: "Indian History", question: "Who was the first Emperor of the Maurya Dynasty?", options: ["Chandragupta Maurya", "Ashoka", "Bindusara", "Harsha"], correctAnswer: "Chandragupta Maurya" },
      { domain: "Indian History", question: "In which year did India gain independence?", options: ["1945", "1946", "1947", "1948"], correctAnswer: "1947" },
      { domain: "Indian History", question: "Who wrote Arthashastra?", options: ["Kalidasa", "Chanakya", "Vatsyayana", "Valmiki"], correctAnswer: "Chanakya" },
      { domain: "Indian History", question: "Who founded the Mughal Empire?", options: ["Akbar", "Babur", "Shah Jahan", "Aurangzeb"], correctAnswer: "Babur" },
      { domain: "Indian History", question: "Which Indian freedom fighter gave the slogan 'Do or Die'?", options: ["Bhagat Singh", "Subhash Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru"], correctAnswer: "Mahatma Gandhi" },
      { domain: "Indian History", question: "Who was the first woman ruler of India?", options: ["Rani Lakshmibai", "Razia Sultana", "Ahilyabai Holkar", "Indira Gandhi"], correctAnswer: "Razia Sultana" },
      { domain: "Indian History", question: "Who was known as the 'Iron Man of India'?", options: ["Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Subhash Chandra Bose", "Jawaharlal Nehru"], correctAnswer: "Sardar Vallabhbhai Patel" },
      { domain: "Indian History", question: "When did the Revolt of 1857 take place?", options: ["1848", "1857", "1861", "1875"], correctAnswer: "1857" },
      { domain: "Indian History", question: "Who was the first Governor-General of independent India?", options: ["Lord Mountbatten", "C. Rajagopalachari", "Jawaharlal Nehru", "Rajendra Prasad"], correctAnswer: "Lord Mountbatten" },
      { domain: "Indian History", question: "Which war led to the creation of Bangladesh?", options: ["1965 War", "1971 War", "Kargil War", "Indo-China War"], correctAnswer: "1971 War" },
      { domain: "Indian History", question: "Who was the founder of the Gupta Empire?", options: ["Chandragupta I", "Samudragupta", "Chandragupta II", "Skandagupta"], correctAnswer: "Chandragupta I" },
      { domain: "Indian History", question: "Who was the last ruler of the Maurya dynasty?", options: ["Ashoka", "Brihadratha", "Bindusara", "Dasaratha"], correctAnswer: "Brihadratha" },
      { domain: "Indian History", question: "Which famous ruler built the Sanchi Stupa?", options: ["Ashoka", "Harsha", "Chandragupta Maurya", "Kanishka"], correctAnswer: "Ashoka" },
      { domain: "Indian History", question: "Who was the founder of the Slave Dynasty?", options: ["Qutub-ud-din Aibak", "Iltutmish", "Balban", "Ghiyasuddin Tughlaq"], correctAnswer: "Qutub-ud-din Aibak" },
      { domain: "Indian History", question: "Who among the following was known as 'Sher Shah Suri'?", options: ["Farid Khan", "Ibrahim Lodhi", "Akbar", "Babur"], correctAnswer: "Farid Khan" },
      { domain: "Indian History", question: "Who introduced the 'Din-i Ilahi' religion?", options: ["Akbar", "Aurangzeb", "Shah Jahan", "Jahangir"], correctAnswer: "Akbar" },
      { domain: "Indian History", question: "Which British Governor-General introduced the Doctrine of Lapse?", options: ["Lord Dalhousie", "Lord Wellesley", "Lord Canning", "Lord Hastings"], correctAnswer: "Lord Dalhousie" },
      { domain: "Indian History", question: "Who was the first Indian to become the Governor-General of India?", options: ["C. Rajagopalachari", "Lord Mountbatten", "Dr. Rajendra Prasad", "Jawaharlal Nehru"], correctAnswer: "C. Rajagopalachari" },
      { domain: "Indian History", question: "Which movement was launched by Mahatma Gandhi in 1942?", options: ["Quit India Movement", "Civil Disobedience Movement", "Non-Cooperation Movement", "Swadeshi Movement"], correctAnswer: "Quit India Movement" },
      { domain: "Indian History", question: "The Battle of Plassey was fought in which year?", options: ["1757", "1764", "1857", "1799"], correctAnswer: "1757" },
      { domain: "Indian History", question: "Who was the founder of the Indian National Congress?", options: ["A.O. Hume", "Dadabhai Naoroji", "Bal Gangadhar Tilak", "Gopal Krishna Gokhale"], correctAnswer: "A.O. Hume" },
      { domain: "Indian History", question: "Who was the first Indian woman to become the President of the Indian National Congress?", options: ["Annie Besant", "Sarojini Naidu", "Indira Gandhi", "Vijaya Lakshmi Pandit"], correctAnswer: "Annie Besant" },
      { domain: "Indian History", question: "Who was the first Indian to pass the ICS Examination?", options: ["Satyendranath Tagore", "Raja Ram Mohan Roy", "Dadabhai Naoroji", "Bal Gangadhar Tilak"], correctAnswer: "Satyendranath Tagore" },
      { domain: "Indian History", question: "Who designed the Indian National Flag?", options: ["Pingali Venkayya", "Rabindranath Tagore", "Bankim Chandra Chatterjee", "Jawaharlal Nehru"], correctAnswer: "Pingali Venkayya" },
      { domain: "Indian History", question: "When was the Jallianwala Bagh massacre?", options: ["1917", "1919", "1921", "1923"], correctAnswer: "1919" },
      { domain: "Indian History", question: "Who was known as the 'Nightingale of India'?", options: ["Sarojini Naidu", "Indira Gandhi", "Annie Besant", "Vijaya Lakshmi Pandit"], correctAnswer: "Sarojini Naidu" },
      { domain: "Indian History", question: "Who was the founder of the Maurya Empire?", options: ["Chandragupta Maurya", "Ashoka", "Bindusara", "Bimbisara"], correctAnswer: "Chandragupta Maurya" },
      { domain: "Indian History", question: "Who was the last Mughal Emperor of India?", options: ["Bahadur Shah II", "Shah Jahan", "Akbar II", "Aurangzeb"], correctAnswer: "Bahadur Shah II" },
      { domain: "Indian History", question: "Who established the Indian Reform Association?", options: ["Keshab Chandra Sen", "Raja Ram Mohan Roy", "Ishwar Chandra Vidyasagar", "Dayanand Saraswati"], correctAnswer: "Keshab Chandra Sen" },
      { domain: "Indian History", question: "When was the First Battle of Panipat fought?", options: ["1526", "1556", "1761", "1857"], correctAnswer: "1526" },
      { domain: "Indian History", question: "Who was the leader of the revolt in Lucknow during 1857?", options: ["Begum Hazrat Mahal", "Rani Lakshmibai", "Tantia Tope", "Mangal Pandey"], correctAnswer: "Begum Hazrat Mahal" },
      { domain: "Indian History", question: "Who started the 'Home Rule Movement'?", options: ["Bal Gangadhar Tilak", "Annie Besant", "Lala Lajpat Rai", "Bipin Chandra Pal"], correctAnswer: "Bal Gangadhar Tilak" },
      { domain: "Indian History", question: "Who was known as 'Netaji'?", options: ["Mahatma Gandhi", "Subhash Chandra Bose", "Sardar Patel", "Bhagat Singh"], correctAnswer: "Subhash Chandra Bose" },
      { domain: "Indian History", question: "Who composed 'Vande Mataram'?", options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Ishwar Chandra Vidyasagar"], correctAnswer: "Bankim Chandra Chatterjee" },
      { domain: "Indian History", question: "Which British Viceroy partitioned Bengal in 1905?", options: ["Lord Curzon", "Lord Lytton", "Lord Ripon", "Lord Minto"], correctAnswer: "Lord Curzon" },
      { domain: "Indian History", question: "When was the Indian National Congress founded?", options: ["1880", "1883", "1885", "1890"], correctAnswer: "1885" },
      { domain: "Indian History", question: "Who was the first Prime Minister of independent India?", options: ["Sardar Patel", "Jawaharlal Nehru", "Mahatma Gandhi", "Rajendra Prasad"], correctAnswer: "Jawaharlal Nehru" },
      { domain: "Indian History", question: "Who introduced the Permanent Settlement System?", options: ["Lord Cornwallis", "Lord Dalhousie", "Lord Canning", "Lord Ripon"], correctAnswer: "Lord Cornwallis" },
      { domain: "Indian History", question: "Which British officer was responsible for the Jallianwala Bagh massacre?", options: ["General Dyer", "Lord Irwin", "Lord Wellesley", "Lord Canning"], correctAnswer: "General Dyer" },
      { domain: "Indian History", question: "Who was the founder of the Arya Samaj?", options: ["Swami Vivekananda", "Swami Dayanand Saraswati", "Raja Ram Mohan Roy", "Keshab Chandra Sen"], correctAnswer: "Swami Dayanand Saraswati" },
      { domain: "Indian History", question: "Which movement was launched by Gandhiji after the Chauri Chaura incident?", options: ["Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement", "Swadeshi Movement"], correctAnswer: "Non-Cooperation Movement" },
      { domain: "Indian History", question: "Who was the first President of the Indian National Congress?", options: ["W.C. Bonnerjee", "Dadabhai Naoroji", "Badruddin Tyabji", "S.N. Banerjee"], correctAnswer: "W.C. Bonnerjee" },
      { domain: "Indian History", question: "When was the Indian Constitution adopted?", options: ["1947", "1948", "1949", "1950"], correctAnswer: "1949" },
      { domain: "Indian History", question: "Who was the first Indian Governor-General after independence?", options: ["Lord Mountbatten", "C. Rajagopalachari", "Dr. Rajendra Prasad", "Jawaharlal Nehru"], correctAnswer: "C. Rajagopalachari" },
      { domain: "Indian History", question: "When did the British Crown take control of India from the East India Company?", options: ["1857", "1858", "1860", "1870"], correctAnswer: "1858" },
      { domain: "Indian History", question: "Who gave the slogan 'Inquilab Zindabad'?", options: ["Bhagat Singh", "Mahatma Gandhi", "Subhash Chandra Bose", "Bal Gangadhar Tilak"], correctAnswer: "Bhagat Singh" },
      { domain: "Indian History", question: "Which ruler built the Red Fort in Delhi?", options: ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"], correctAnswer: "Shah Jahan" },
      { domain: "Indian History", question: "Who introduced English education in India?", options: ["Lord Macaulay", "Lord Dalhousie", "Lord Ripon", "Lord Curzon"], correctAnswer: "Lord Macaulay" },
      { domain: "Indian History", question: "Who started the 'Civil Disobedience Movement'?", options: ["Mahatma Gandhi", "Subhash Chandra Bose", "Sardar Patel", "Jawaharlal Nehru"], correctAnswer: "Mahatma Gandhi" },
      { domain: "Indian History", question: "What was the capital of the Maurya Empire?", options: ["Patliputra", "Taxila", "Kalinga", "Ayodhya"], correctAnswer: "Patliputra" },
      { domain: "Indian History", question: "Who built the Qutub Minar?", options: ["Qutub-ud-din Aibak", "Iltutmish", "Alauddin Khilji", "Balban"], correctAnswer: "Qutub-ud-din Aibak" },
      { domain: "Indian History", question: "When was Mahatma Gandhi assassinated?", options: ["1947", "1948", "1949", "1950"], correctAnswer: "1948" },


      /* ⚽ Sports (50 questions, shortened for example — add similar pattern) */
      { domain: "Sports", question: "Which country won the FIFA World Cup 2022?", options: ["Brazil", "Argentina", "France", "Germany"], correctAnswer: "Argentina" },
      { domain: "Sports", question: "How many players are there in a cricket team?", options: ["9", "10", "11", "12"], correctAnswer: "11" },
      { domain: "Sports", question: "Who has won the most Olympic gold medals?", options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Simone Biles"], correctAnswer: "Michael Phelps" },
      { domain: "Sports", question: "What sport uses the term 'love' for a score of zero?", options: ["Tennis", "Badminton", "Squash", "Table Tennis"], correctAnswer: "Tennis" },
      { domain: "Sports", question: "Which country hosts Wimbledon?", options: ["USA", "France", "UK", "Australia"], correctAnswer: "UK" },
      { domain: "Sports", question: "Which cricket player is known as the 'Master Blaster'?", options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "Brian Lara"], correctAnswer: "Sachin Tendulkar" },
      { domain: "Sports", question: "Which country hosted the 2016 Olympics?", options: ["China", "Brazil", "Japan", "UK"], correctAnswer: "Brazil" },
      { domain: "Sports", question: "What is the national sport of Canada?", options: ["Lacrosse", "Ice Hockey", "Baseball", "Soccer"], correctAnswer: "Ice Hockey" },
      { domain: "Sports", question: "Which country won the first Cricket World Cup in 1975?", options: ["India", "Australia", "West Indies", "England"], correctAnswer: "West Indies" },
      { domain: "Sports", question: "Who won the first Olympic gold medal for India?", options: ["Abhinav Bindra", "Milkha Singh", "K.D. Jadhav", "Sushil Kumar"], correctAnswer: "Abhinav Bindra" },
      { domain: "Sports", question: "Which city hosted the 2008 Summer Olympics?", options: ["London", "Beijing", "Athens", "Sydney"], correctAnswer: "Beijing" },
      { domain: "Sports", question: "Who is known as the 'Flying Sikh' of India?", options: ["Milkha Singh", "P.T. Usha", "Dhanraj Pillay", "Kapil Dev"], correctAnswer: "Milkha Singh" },
      { domain: "Sports", question: "How many rings are there in the Olympic symbol?", options: ["4", "5", "6", "7"], correctAnswer: "5" },
      { domain: "Sports", question: "Who holds the record for most runs in Test cricket?", options: ["Ricky Ponting", "Sachin Tendulkar", "Jacques Kallis", "Brian Lara"], correctAnswer: "Sachin Tendulkar" },
      { domain: "Sports", question: "Who is the fastest man in the world?", options: ["Usain Bolt", "Tyson Gay", "Carl Lewis", "Yohan Blake"], correctAnswer: "Usain Bolt" },
      { domain: "Sports", question: "Which country has won the most FIFA World Cups?", options: ["Germany", "Argentina", "Brazil", "Italy"], correctAnswer: "Brazil" },
      { domain: "Sports", question: "Who is the captain of the Indian men's cricket team in 2025?", options: ["Rohit Sharma", "Virat Kohli", "Hardik Pandya", "KL Rahul"], correctAnswer: "Rohit Sharma" },
      { domain: "Sports", question: "In which sport would you perform a 'slam dunk'?", options: ["Basketball", "Tennis", "Volleyball", "Football"], correctAnswer: "Basketball" },
      { domain: "Sports", question: "What is the length of a marathon?", options: ["25 km", "30 km", "42.195 km", "50 km"], correctAnswer: "42.195 km" },
      { domain: "Sports", question: "Who won the Ballon d'Or in 2023?", options: ["Lionel Messi", "Erling Haaland", "Kylian Mbappe", "Cristiano Ronaldo"], correctAnswer: "Lionel Messi" },
      { domain: "Sports", question: "Which country hosted the FIFA World Cup 2018?", options: ["Brazil", "Russia", "Germany", "France"], correctAnswer: "Russia" },
      { domain: "Sports", question: "Who won the ICC T20 World Cup 2024?", options: ["India", "England", "Australia", "West Indies"], correctAnswer: "India" },
      { domain: "Sports", question: "In which sport is the term 'birdie' used?", options: ["Golf", "Tennis", "Badminton", "Baseball"], correctAnswer: "Golf" },
      { domain: "Sports", question: "What is the maximum score in a single frame of snooker?", options: ["147", "150", "155", "160"], correctAnswer: "147" },
      { domain: "Sports", question: "Who is known as the 'God of Football'?", options: ["Diego Maradona", "Cristiano Ronaldo", "Lionel Messi", "Pelé"], correctAnswer: "Pelé" },
      { domain: "Sports", question: "What sport does Roger Federer play?", options: ["Badminton", "Tennis", "Squash", "Table Tennis"], correctAnswer: "Tennis" },
      { domain: "Sports", question: "How many players are there on a basketball team on the court?", options: ["4", "5", "6", "7"], correctAnswer: "5" },
      { domain: "Sports", question: "Which sport is associated with the term 'knockout'?", options: ["Boxing", "Wrestling", "Judo", "Karate"], correctAnswer: "Boxing" },
      { domain: "Sports", question: "Who was the first Indian woman to win an Olympic silver medal?", options: ["P.V. Sindhu", "Mary Kom", "Saina Nehwal", "Karnam Malleswari"], correctAnswer: "P.V. Sindhu" },
      { domain: "Sports", question: "What is the diameter of a basketball hoop?", options: ["15 inches", "18 inches", "20 inches", "22 inches"], correctAnswer: "18 inches" },
      { domain: "Sports", question: "Who won the ICC Cricket World Cup 2011?", options: ["India", "Sri Lanka", "Australia", "England"], correctAnswer: "India" },
      { domain: "Sports", question: "Where were the 2020 Olympics held?", options: ["Tokyo", "Paris", "Beijing", "Rio de Janeiro"], correctAnswer: "Tokyo" },
      { domain: "Sports", question: "What is the full form of IPL?", options: ["Indian Premier League", "International Players League", "Indian Professional League", "International Premier League"], correctAnswer: "Indian Premier League" },
      { domain: "Sports", question: "Who is the only cricketer to score 100 international centuries?", options: ["Ricky Ponting", "Sachin Tendulkar", "Virat Kohli", "Brian Lara"], correctAnswer: "Sachin Tendulkar" },
      { domain: "Sports", question: "What is the national sport of Japan?", options: ["Sumo Wrestling", "Baseball", "Judo", "Karate"], correctAnswer: "Sumo Wrestling" },
      { domain: "Sports", question: "Who won the UEFA Euro 2020 tournament?", options: ["Italy", "England", "France", "Portugal"], correctAnswer: "Italy" },
      { domain: "Sports", question: "Which sport uses the term 'free kick'?", options: ["Football", "Basketball", "Baseball", "Rugby"], correctAnswer: "Football" },
      { domain: "Sports", question: "Who was the first Indian to win a Grand Slam title?", options: ["Leander Paes", "Mahesh Bhupathi", "Sania Mirza", "Rohan Bopanna"], correctAnswer: "Leander Paes" },
      { domain: "Sports", question: "What color flag is waved to stop a car race?", options: ["Red", "Yellow", "Green", "Blue"], correctAnswer: "Red" },
      { domain: "Sports", question: "Which team won the first IPL tournament?", options: ["Rajasthan Royals", "Chennai Super Kings", "Mumbai Indians", "Kolkata Knight Riders"], correctAnswer: "Rajasthan Royals" },
      { domain: "Sports", question: "In chess, which piece can move in an 'L' shape?", options: ["Knight", "Rook", "Bishop", "Queen"], correctAnswer: "Knight" },
      { domain: "Sports", question: "Which Indian boxer won an Olympic bronze medal in 2012?", options: ["Mary Kom", "Vijender Singh", "Lovlina Borgohain", "Amit Panghal"], correctAnswer: "Mary Kom" },
      { domain: "Sports", question: "Which cricket ground is known as the 'Mecca of Cricket'?", options: ["Lords", "MCG", "Eden Gardens", "Oval"], correctAnswer: "Lords" },
      { domain: "Sports", question: "What is the maximum possible break in bowling?", options: ["300", "350", "400", "450"], correctAnswer: "300" },
      { domain: "Sports", question: "In which country did the game of golf originate?", options: ["England", "Scotland", "Ireland", "France"], correctAnswer: "Scotland" },
      { domain: "Sports", question: "Who is known as the 'Prince of Kolkata' in cricket?", options: ["Sourav Ganguly", "Virat Kohli", "Rahul Dravid", "VVS Laxman"], correctAnswer: "Sourav Ganguly" },
      { domain: "Sports", question: "Who holds the record for the highest individual score in ODI cricket?", options: ["Rohit Sharma", "Martin Guptill", "Chris Gayle", "Virender Sehwag"], correctAnswer: "Rohit Sharma" },
      { domain: "Sports", question: "Which country has won the most Olympic medals in total?", options: ["China", "USA", "Russia", "UK"], correctAnswer: "USA" },
      { domain: "Sports", question: "Who was the first Indian woman to win a medal at the Olympics?", options: ["Karnam Malleswari", "P.T. Usha", "Saina Nehwal", "Mary Kom"], correctAnswer: "Karnam Malleswari" },
      { domain: "Sports", question: "Which sport is associated with the term 'googly'?", options: ["Cricket", "Baseball", "Tennis", "Badminton"], correctAnswer: "Cricket" },
      { domain: "Sports", question: "What is the distance of a standard football penalty kick?", options: ["8 yards", "10 yards", "11 meters", "12 meters"], correctAnswer: "11 meters" },


      /* 🌍 GK */
      { domain: "GK", question: "What is the capital of Australia?", options: ["Sydney", "Canberra", "Melbourne", "Brisbane"], correctAnswer: "Canberra" },
      { domain: "GK", question: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Venus", "Mercury"], correctAnswer: "Mars" },
      { domain: "GK", question: "What is the largest ocean on Earth?", options: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"], correctAnswer: "Pacific Ocean" },
      { domain: "GK", question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Osmium", "Oxide", "Ozone"], correctAnswer: "Oxygen" },
      { domain: "GK", question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correctAnswer: "12" },
      { domain: "GK", question: "Which gas do plants absorb during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
      { domain: "GK", question: "Who was the first man to step on the moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], correctAnswer: "Neil Armstrong" },
      { domain: "GK", question: "Which is the smallest continent in the world?", options: ["Europe", "Australia", "Antarctica", "South America"], correctAnswer: "Australia" },
      { domain: "GK", question: "What is the national currency of Japan?", options: ["Yen", "Won", "Dollar", "Peso"], correctAnswer: "Yen" },
      { domain: "GK", question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: "Nile" },
      { domain: "GK", question: "How many colors are there in a rainbow?", options: ["6", "7", "8", "9"], correctAnswer: "7" },
      { domain: "GK", question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correctAnswer: "Mercury" },
      { domain: "GK", question: "Which country is known as the Land of Rising Sun?", options: ["China", "Japan", "Korea", "Thailand"], correctAnswer: "Japan" },
      { domain: "GK", question: "Which animal is known as the Ship of the Desert?", options: ["Camel", "Horse", "Elephant", "Donkey"], correctAnswer: "Camel" },
      { domain: "GK", question: "Which is the largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], correctAnswer: "Jupiter" },
      { domain: "GK", question: "Which metal is liquid at room temperature?", options: ["Mercury", "Iron", "Gold", "Silver"], correctAnswer: "Mercury" },
      { domain: "GK", question: "Which is the tallest mountain in the world?", options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"], correctAnswer: "Mount Everest" },
      { domain: "GK", question: "Who invented the telephone?", options: ["Thomas Edison", "Alexander Graham Bell", "James Watt", "Benjamin Franklin"], correctAnswer: "Alexander Graham Bell" },
      { domain: "GK", question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Pt", "Gd"], correctAnswer: "Au" },
      { domain: "GK", question: "Which organ purifies our blood?", options: ["Heart", "Lungs", "Kidney", "Liver"], correctAnswer: "Kidney" },
      { domain: "GK", question: "Who wrote the Indian national anthem?", options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subramania Bharathi"], correctAnswer: "Rabindranath Tagore" },
      { domain: "GK", question: "Which festival is known as the Festival of Lights?", options: ["Holi", "Eid", "Diwali", "Onam"], correctAnswer: "Diwali" },
      { domain: "GK", question: "How many states are there in India?", options: ["28", "29", "30", "27"], correctAnswer: "28" },
      { domain: "GK", question: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Arabian", "Thar"], correctAnswer: "Sahara" },
      { domain: "GK", question: "Which instrument measures atmospheric pressure?", options: ["Thermometer", "Barometer", "Anemometer", "Hygrometer"], correctAnswer: "Barometer" },
      { domain: "GK", question: "What is the national flower of India?", options: ["Lotus", "Rose", "Sunflower", "Jasmine"], correctAnswer: "Lotus" },
      { domain: "GK", question: "Who discovered gravity?", options: ["Albert Einstein", "Isaac Newton", "Galileo", "Aristotle"], correctAnswer: "Isaac Newton" },
      { domain: "GK", question: "Which planet is known for its rings?", options: ["Jupiter", "Saturn", "Neptune", "Uranus"], correctAnswer: "Saturn" },
      { domain: "GK", question: "What is the boiling point of water?", options: ["90°C", "95°C", "100°C", "105°C"], correctAnswer: "100°C" },
      { domain: "GK", question: "Which blood group is the universal donor?", options: ["A", "B", "AB", "O"], correctAnswer: "O" },
      { domain: "GK", question: "What is the national animal of India?", options: ["Lion", "Elephant", "Tiger", "Peacock"], correctAnswer: "Tiger" },
      { domain: "GK", question: "Who invented the light bulb?", options: ["Thomas Edison", "Michael Faraday", "Isaac Newton", "Benjamin Franklin"], correctAnswer: "Thomas Edison" },
      { domain: "GK", question: "Which continent is known as the Dark Continent?", options: ["Asia", "Africa", "Europe", "South America"], correctAnswer: "Africa" },
      { domain: "GK", question: "Which is the fastest land animal?", options: ["Tiger", "Cheetah", "Lion", "Horse"], correctAnswer: "Cheetah" },
      { domain: "GK", question: "Which Indian city is known as the Silicon Valley of India?", options: ["Hyderabad", "Mumbai", "Bangalore", "Delhi"], correctAnswer: "Bangalore" },
      { domain: "GK", question: "Which is the largest island in the world?", options: ["Greenland", "New Guinea", "Borneo", "Madagascar"], correctAnswer: "Greenland" },
      { domain: "GK", question: "Who discovered penicillin?", options: ["Alexander Fleming", "Marie Curie", "Isaac Newton", "Albert Einstein"], correctAnswer: "Alexander Fleming" },
      { domain: "GK", question: "Which is the longest wall in the world?", options: ["Great Wall of China", "Berlin Wall", "Hadrian’s Wall", "Wall of Babylon"], correctAnswer: "Great Wall of China" },
      { domain: "GK", question: "Which planet has the largest number of moons?", options: ["Earth", "Jupiter", "Saturn", "Mars"], correctAnswer: "Saturn" },
      { domain: "GK", question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Pablo Picasso", "Michelangelo", "Raphael"], correctAnswer: "Leonardo da Vinci" },
      { domain: "GK", question: "Which is the largest bone in the human body?", options: ["Femur", "Tibia", "Humerus", "Fibula"], correctAnswer: "Femur" },
      { domain: "GK", question: "What is the hardest natural substance on Earth?", options: ["Iron", "Diamond", "Gold", "Platinum"], correctAnswer: "Diamond" },
      { domain: "GK", question: "Which planet is known as the Blue Planet?", options: ["Venus", "Earth", "Neptune", "Jupiter"], correctAnswer: "Earth" },
      { domain: "GK", question: "What is the chemical formula of water?", options: ["CO2", "H2O", "NaCl", "O2"], correctAnswer: "H2O" },
      { domain: "GK", question: "Who was the first President of India?", options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Sardar Patel", "Indira Gandhi"], correctAnswer: "Dr. Rajendra Prasad" },
      { domain: "GK", question: "Which city is known as the Pink City of India?", options: ["Udaipur", "Jaipur", "Jodhpur", "Delhi"], correctAnswer: "Jaipur" },
      { domain: "GK", question: "Which Indian festival is known as the Festival of Colors?", options: ["Diwali", "Holi", "Eid", "Pongal"], correctAnswer: "Holi" },
      { domain: "GK", question: "Which planet is farthest from the Sun?", options: ["Neptune", "Pluto", "Uranus", "Saturn"], correctAnswer: "Neptune" },
      { domain: "GK", question: "Which is the largest democracy in the world?", options: ["USA", "China", "India", "Russia"], correctAnswer: "India" },
      { domain: "GK", question: "Which Indian city is known as the City of Joy?", options: ["Delhi", "Kolkata", "Mumbai", "Chennai"], correctAnswer: "Kolkata" },
      { domain: "GK", question: "Which planet is known as the Morning Star?", options: ["Venus", "Mars", "Mercury", "Jupiter"], correctAnswer: "Venus" },
      { domain: "GK", question: "Who invented the computer?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], correctAnswer: "Charles Babbage" },
      { domain: "GK", question: "Which animal lays eggs?", options: ["Cow", "Dog", "Hen", "Cat"], correctAnswer: "Hen" },
      { domain: "GK", question: "Which is the largest lake in the world?", options: ["Caspian Sea", "Lake Superior", "Lake Victoria", "Lake Baikal"], correctAnswer: "Caspian Sea" },
      { domain: "GK", question: "Which is the largest country in the world by area?", options: ["USA", "China", "Russia", "Canada"], correctAnswer: "Russia" },


      /* 🎬 Cinema */
      { domain: "Cinema", question: "Who directed the movie 'Inception'?", options: ["Christopher Nolan", "James Cameron", "Steven Spielberg", "Martin Scorsese"], correctAnswer: "Christopher Nolan" },
      { domain: "Cinema", question: "Which Indian movie won the Oscar for Best Original Song in 2023?", options: ["RRR", "Lagaan", "Dangal", "Bahubali"], correctAnswer: "RRR" },
      { domain: "Cinema", question: "Who is known as the father of Indian cinema?", options: ["Satyajit Ray", "Dadasaheb Phalke", "Raj Kapoor", "Guru Dutt"], correctAnswer: "Dadasaheb Phalke" },
      { domain: "Cinema", question: "Who played Iron Man in the Marvel Cinematic Universe?", options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Tom Holland"], correctAnswer: "Robert Downey Jr." },
      { domain: "Cinema", question: "Which film won the first Oscar for Best Picture?", options: ["Wings", "Gone with the Wind", "Casablanca", "Citizen Kane"], correctAnswer: "Wings" },
      { domain: "Cinema", question: "Who directed the film 'Titanic'?", options: ["James Cameron", "Christopher Nolan", "Steven Spielberg", "Ridley Scott"], correctAnswer: "James Cameron" },
      { domain: "Cinema", question: "Which movie features the song 'My Heart Will Go On'?", options: ["Titanic", "Avatar", "Frozen", "La La Land"], correctAnswer: "Titanic" },
      { domain: "Cinema", question: "Who played the role of Harry Potter in the movie series?", options: ["Daniel Radcliffe", "Rupert Grint", "Elijah Wood", "Tom Felton"], correctAnswer: "Daniel Radcliffe" },
      { domain: "Cinema", question: "Which is the first Indian movie to win an Oscar?", options: ["Gandhi", "Lagaan", "Slumdog Millionaire", "RRR"], correctAnswer: "Gandhi" },
      { domain: "Cinema", question: "Who directed 'Avatar'?", options: ["James Cameron", "Peter Jackson", "Christopher Nolan", "Zack Snyder"], correctAnswer: "James Cameron" },
      { domain: "Cinema", question: "Who played 'Joker' in 'The Dark Knight'?", options: ["Heath Ledger", "Joaquin Phoenix", "Jack Nicholson", "Jared Leto"], correctAnswer: "Heath Ledger" },
      { domain: "Cinema", question: "Which movie won the Oscar for Best Picture in 2020?", options: ["1917", "Parasite", "Joker", "Once Upon a Time in Hollywood"], correctAnswer: "Parasite" },
      { domain: "Cinema", question: "Who composed the music for 'RRR'?", options: ["A.R. Rahman", "M.M. Keeravani", "Ilaiyaraaja", "Pritam"], correctAnswer: "M.M. Keeravani" },
      { domain: "Cinema", question: "Which film series features the character 'Jack Sparrow'?", options: ["Pirates of the Caribbean", "Harry Potter", "Lord of the Rings", "Star Wars"], correctAnswer: "Pirates of the Caribbean" },
      { domain: "Cinema", question: "Who directed 'The Godfather'?", options: ["Francis Ford Coppola", "Martin Scorsese", "Quentin Tarantino", "Steven Spielberg"], correctAnswer: "Francis Ford Coppola" },
      { domain: "Cinema", question: "Which is the highest-grossing film of all time (as of 2025)?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Avatar: The Way of Water"], correctAnswer: "Avatar" },
      { domain: "Cinema", question: "Who played 'Iron Man'?", options: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"], correctAnswer: "Robert Downey Jr." },
      { domain: "Cinema", question: "Which actor is known as 'Mr. Perfectionist' in Bollywood?", options: ["Aamir Khan", "Shah Rukh Khan", "Salman Khan", "Akshay Kumar"], correctAnswer: "Aamir Khan" },
      { domain: "Cinema", question: "Which was the first Indian talkie film?", options: ["Alam Ara", "Raja Harishchandra", "Mughal-e-Azam", "Mother India"], correctAnswer: "Alam Ara" },
      { domain: "Cinema", question: "Who directed 'Baahubali'?", options: ["S.S. Rajamouli", "Shankar", "Mani Ratnam", "Rohit Shetty"], correctAnswer: "S.S. Rajamouli" },
      { domain: "Cinema", question: "Which actor played 'Spider-Man' in the Marvel Cinematic Universe?", options: ["Tobey Maguire", "Tom Holland", "Andrew Garfield", "Chris Pratt"], correctAnswer: "Tom Holland" },
      { domain: "Cinema", question: "Which Indian actor is known as the 'King of Bollywood'?", options: ["Salman Khan", "Shah Rukh Khan", "Aamir Khan", "Hrithik Roshan"], correctAnswer: "Shah Rukh Khan" },
      { domain: "Cinema", question: "Which movie won the first National Film Award for Best Film?", options: ["Kabuliwala", "Do Bigha Zamin", "Mother India", "Pather Panchali"], correctAnswer: "Do Bigha Zamin" },
      { domain: "Cinema", question: "Who composed the soundtrack of 'Slumdog Millionaire'?", options: ["A.R. Rahman", "Pritam", "Shankar-Ehsaan-Loy", "Anu Malik"], correctAnswer: "A.R. Rahman" },
      { domain: "Cinema", question: "Which movie has the dialogue 'May the Force be with you'?", options: ["Star Wars", "Matrix", "Avatar", "Interstellar"], correctAnswer: "Star Wars" },
      { domain: "Cinema", question: "Who directed 'The Shawshank Redemption'?", options: ["Frank Darabont", "Martin Scorsese", "Quentin Tarantino", "Christopher Nolan"], correctAnswer: "Frank Darabont" },
      { domain: "Cinema", question: "Who played 'Rocky Balboa'?", options: ["Sylvester Stallone", "Arnold Schwarzenegger", "Bruce Willis", "Tom Cruise"], correctAnswer: "Sylvester Stallone" },
      { domain: "Cinema", question: "Which was the first Indian movie submitted for the Oscars?", options: ["Mother India", "Lagaan", "Pather Panchali", "Guide"], correctAnswer: "Mother India" },
      { domain: "Cinema", question: "Who directed 'The Dark Knight' trilogy?", options: ["Christopher Nolan", "James Cameron", "Zack Snyder", "Sam Raimi"], correctAnswer: "Christopher Nolan" },
      { domain: "Cinema", question: "Which Indian actor is known as 'Thalaiva'?", options: ["Rajinikanth", "Mohanlal", "Kamal Haasan", "Chiranjeevi"], correctAnswer: "Rajinikanth" },
      { domain: "Cinema", question: "Which movie features the line 'I’ll be back'?", options: ["Terminator", "Predator", "Die Hard", "RoboCop"], correctAnswer: "Terminator" },
      { domain: "Cinema", question: "Who directed 'Interstellar'?", options: ["Christopher Nolan", "Ridley Scott", "James Cameron", "David Fincher"], correctAnswer: "Christopher Nolan" },
      { domain: "Cinema", question: "Which movie has the song 'Naatu Naatu'?", options: ["RRR", "Pushpa", "KGF", "Bahubali"], correctAnswer: "RRR" },
      { domain: "Cinema", question: "Who won the Oscar for Best Actor in 2022?", options: ["Will Smith", "Leonardo DiCaprio", "Brad Pitt", "Joaquin Phoenix"], correctAnswer: "Will Smith" },
      { domain: "Cinema", question: "Which is the first color film in India?", options: ["Kisan Kanya", "Mughal-e-Azam", "Mother India", "Barsaat"], correctAnswer: "Kisan Kanya" },
      { domain: "Cinema", question: "Which actor played 'Black Panther'?", options: ["Chadwick Boseman", "Anthony Mackie", "Don Cheadle", "Michael B. Jordan"], correctAnswer: "Chadwick Boseman" },
      { domain: "Cinema", question: "Who directed 'Lagaan'?", options: ["Ashutosh Gowariker", "Karan Johar", "Rajkumar Hirani", "Anurag Kashyap"], correctAnswer: "Ashutosh Gowariker" },
      { domain: "Cinema", question: "Which Indian film was nominated for Best Foreign Language Film at the Oscars in 2021?", options: ["Jallikattu", "The Lunchbox", "Lagaan", "Village Rockstars"], correctAnswer: "Jallikattu" },
      { domain: "Cinema", question: "Who directed 'Pather Panchali'?", options: ["Satyajit Ray", "Guru Dutt", "Bimal Roy", "Mehboob Khan"], correctAnswer:
            "Satyajit Ray" },
    ];

   

    await Question.deleteMany();
    await Question.insertMany(sampleQuestions);

    res.json({ message: "✅ 50 sample questions per domain added successfully!" });
  } catch (err) {
    res.status(500).json({
      message: "Error seeding questions",
      error: err.message,
    });
  }
});

export default router;
