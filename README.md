# Interactive Quiz Web App

A modern, responsive quiz application built with JavaScript (ES6+), Bootstrap 5, and CSS animations featuring smooth transitions and a results view with confetti celebration.

![Quiz App Screenshot](https://via.placeholder.com/800x500.png?text=Quiz+App+Screenshot)

## Features

- 🎯 **Modern JavaScript** (ES6+ syntax)
- 🎨 **Bootstrap 5** for responsive design
- ✨ **Animations** throughout the user experience
- ⏱️ **Timer** to track quiz duration
- 📊 **Results view** with score visualization
- 🎉 **Confetti celebration** for high scores
- 🔄 **Quiz restart** functionality
- 📱 **Fully responsive** design

## Technologies Used

- HTML5
- CSS3 (with animations)
- JavaScript (ES6+)
- [Bootstrap 5](https://getbootstrap.com/)
- [Animate.css](https://animate.style/)

## Installation

No installation required! Simply open `index.html` in any modern web browser.

To run locally:

1. Clone this repository or download the files
2. Open `index.html` in your browser

## Customization

### Changing Questions

Edit the `questions` array in `script.js`:

```javascript
const questions = [
    {
        question: "Your question here",
        answers: [
            { text: "Answer 1", correct: false },
            { text: "Answer 2", correct: true },
            // ... more answers
        ]
    },
    // ... more questions
];
```

### Styling Changes

Modify `styles.css` to change colors, fonts, or layout:

```css
/* Example color change */
body {
    background-color: #your-color;
}

.btn-primary {
    background-color: #your-color;
}
```

### Animation Adjustments

Edit animation classes in the HTML or add new ones from [Animate.css](https://animate.style/).

## How It Works

1. **Welcome Screen**: User enters their name
2. **Quiz Screen**: 
   - Questions displayed one at a time
   - Progress tracker
   - Timer running
   - Immediate feedback on answers
3. **Results Screen**:
   - Score percentage with animated bar
   - Time taken
   - Personalized message
   - Confetti for high scores (80%+)
   - Option to restart

## Browser Support

The app works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy the quiz!** 🚀
```

You can copy this content into a file named `README.md` in your project directory. The placeholder image URL can be replaced with an actual screenshot of your quiz app if you'd like.

The README includes:
1. Project title and brief description
2. Features list with emojis
3. Technologies used
4. Installation instructions
5. Customization guide
6. How the app works
7. Browser support
8. License information

You might want to:
- Add actual screenshots (replace the placeholder)
- Add a "Contributing" section if you want others to contribute
- Add a "Credits" section if you used any third-party resources
- Include your contact information if you want feedback
