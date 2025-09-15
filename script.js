// Awesome Face Generator JavaScript
class AwesomeFaceGenerator {
    constructor() {
        this.currentFace = '😎';
        this.currentAccessories = [];
        this.currentBgColor = '#FFD700';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.animateCounters();
        this.setupScrollAnimations();
    }

    setupEventListeners() {
        // Style buttons
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFace = e.target.dataset.style;
                this.updateFace();
            });
        });

        // Color picker
        document.getElementById('bgColor').addEventListener('change', (e) => {
            this.currentBgColor = e.target.value;
            this.updateBackground();
        });

        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                document.getElementById('bgColor').value = color;
                this.currentBgColor = color;
                this.updateBackground();
            });
        });

        // Accessory buttons
        document.querySelectorAll('.accessory-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const accessory = e.target.dataset.accessory;
                this.toggleAccessory(accessory, e.target);
            });
        });

        // Randomize button
        document.querySelector('.generator-preview').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-small') && e.target.textContent.includes('Randomize')) {
                this.randomizeFace();
            }
        });
    }

    updateFace() {
        const faceBase = document.getElementById('faceBase');
        const generatorImage = document.getElementById('generatorFaceImage');
        
        // Update the main awesome face image
        if (generatorImage) {
            generatorImage.src = 'Awesome_Face.svg.png';
        }
        
        this.addAccessories();
    }

    updateBackground() {
        const facePreview = document.querySelector('.face-preview');
        facePreview.style.background = this.currentBgColor;
    }

    toggleAccessory(accessory, button) {
        const index = this.currentAccessories.indexOf(accessory);
        if (index > -1) {
            this.currentAccessories.splice(index, 1);
            button.style.background = 'white';
            button.style.borderColor = '#ddd';
        } else {
            this.currentAccessories.push(accessory);
            button.style.background = '#FFD700';
            button.style.borderColor = '#FFD700';
        }
        this.addAccessories();
    }

    addAccessories() {
        const faceBase = document.getElementById('faceBase');
        
        // Clear existing accessories
        const existingAccessories = faceBase.querySelectorAll('.accessory');
        existingAccessories.forEach(accessory => accessory.remove());
        
        // Define specific positions for each accessory type on the face
        const accessoryPositions = {
            '👑': { x: 50, y: -15, size: '5rem' }, // Crown way above head
            '🎩': { x: 50, y: -12, size: '5rem' }, // Hat way above head
            '🕶️': { x: 40, y: 55, size: '16.7rem' }, // Sunglasses on eyes
            '💎': { x: 30, y: 60, size: '1.8rem' }, // Diamond earring
            '🚀': { x: 70, y: 60, size: '1.8rem' }, // Rocket on side
            '⭐': { x: 20, y: 30, size: '1.8rem' }  // Star decoration
        };
        
        // Add new accessories positioned on the face
        this.currentAccessories.forEach((accessory, index) => {
            const accessoryElement = document.createElement('div');
            accessoryElement.className = 'accessory';
            
            const position = accessoryPositions[accessory] || { x: 50, y: 50, size: '1rem' };
            
            // Check if this is the glasses and use image instead of emoji
            if (accessory === '🕶️') {
                const img = document.createElement('img');
                img.src = 'glasses.png';
                img.alt = 'Sunglasses';
                img.style.cssText = `
                    width: ${position.size};
                    height: auto;
                    object-fit: contain;
                `;
                accessoryElement.appendChild(img);
            } else {
                accessoryElement.textContent = accessory;
                accessoryElement.style.fontSize = position.size;
            }
            
            accessoryElement.style.cssText += `
                position: absolute;
                z-index: 10;
                left: ${position.x}%;
                top: ${position.y}%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
                animation: accessoryFloat 2s ease-in-out infinite;
                animation-delay: ${index * 0.3}s;
            `;
            
            faceBase.appendChild(accessoryElement);
        });
    }

    randomizeFace() {
        // Keep the awesome face image as base
        this.currentFace = 'Awesome_Face.svg.png';
        
        // Update active style button (first one since we're using the image)
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.style-btn').classList.add('active');

        // Random background color
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.currentBgColor = randomColor;
        document.getElementById('bgColor').value = randomColor;

        // Random accessories (0-4 accessories)
        this.currentAccessories = [];
        const accessories = ['👑', '🎩', '🕶️', '💎', '🚀', '⭐'];
        const numAccessories = Math.floor(Math.random() * 5); // 0-4 accessories
        
        for (let i = 0; i < numAccessories; i++) {
            const randomAccessory = accessories[Math.floor(Math.random() * accessories.length)];
            if (!this.currentAccessories.includes(randomAccessory)) {
                this.currentAccessories.push(randomAccessory);
            }
        }

        // Update accessory buttons
        document.querySelectorAll('.accessory-btn').forEach(btn => {
            btn.style.background = 'white';
            btn.style.borderColor = '#ddd';
            if (this.currentAccessories.includes(btn.dataset.accessory)) {
                btn.style.background = '#FFD700';
                btn.style.borderColor = '#FFD700';
            }
        });

        this.updateFace();
        this.updateBackground();
        
        // Add some animation
        const facePreview = document.querySelector('.face-preview');
        facePreview.style.transform = 'scale(1.1)';
        setTimeout(() => {
            facePreview.style.transform = 'scale(1)';
        }, 200);
    }

    downloadFace() {
        console.log('Download function called');
        const facePreview = document.querySelector('.face-preview');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 400;
        canvas.height = 400;
        
        // Draw background
        ctx.fillStyle = this.currentBgColor;
        ctx.beginPath();
        ctx.arc(200, 200, 180, 0, 2 * Math.PI);
        ctx.fill();
        
        // For now, let's use a simple approach that works without CORS
        // Draw a simple awesome face emoji as the base
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(200, 200, 100, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw the awesome face emoji
        ctx.font = '120px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('😎', 200, 200);
        
        // Draw accessories positioned on the face
        const accessoryPositions = {
            '👑': { x: 200, y: 20, size: 100 }, // Crown way above head
            '🎩': { x: 200, y: 30, size: 100 }, // Hat way above head
            '🕶️': { x: 160, y: 220, size: 333 }, // Sunglasses on eyes
            '💎': { x: 140, y: 240, size: 35 }, // Diamond earring
            '🚀': { x: 260, y: 240, size: 35 }, // Rocket on side
            '⭐': { x: 120, y: 160, size: 35 }  // Star decoration
        };
        
        // Draw accessories
        this.currentAccessories.forEach((accessory, index) => {
            const position = accessoryPositions[accessory] || { x: 200, y: 200, size: 20 };
            
            if (accessory === '🕶️') {
                // For glasses, draw a simple rectangle as placeholder
                ctx.fillStyle = '#000';
                ctx.fillRect(position.x - position.size/2, position.y - position.size/4, position.size, position.size/2);
            } else {
                // Draw emoji accessories
                ctx.font = `${position.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(accessory, position.x, position.y);
            }
        });
        
        // Download the image
        console.log('Downloading image...');
        const link = document.createElement('a');
        link.download = 'awesome-face.png';
        link.href = canvas.toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    shareFace() {
        const faceText = `Check out my awesome face with ${this.currentAccessories.join('')} accessories! #AwesomeCoin #Memecoin`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Awesome Face',
                text: faceText,
                url: window.location.href
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(faceText).then(() => {
                alert('Face copied to clipboard! Share it on social media! 🚀');
            });
        }
    }

    animateCounters() {
        const animateValue = (element, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const current = Math.floor(progress * (end - start) + start);
                element.textContent = current.toLocaleString() + '+';
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        // Special animation for market cap - goes to infinity
        const animateMarketCap = (element) => {
            console.log('Starting market cap animation on element:', element);
            let currentValue = 1000000; // Start at $1M
            let increment = 100000; // Start with $100K increments
            let speed = 50; // Update every 50ms
            let duration = 0;
            const maxDuration = 8000; // Run for 8 seconds
            
            const step = () => {
                currentValue += increment;
                
                // Increase increment over time for exponential growth
                if (currentValue > 10000000) increment = 500000;
                if (currentValue > 100000000) increment = 2000000;
                if (currentValue > 1000000000) increment = 10000000;
                if (currentValue > 10000000000) increment = 50000000;
                if (currentValue > 100000000000) increment = 200000000;
                
                // Format the number
                if (currentValue >= 1000000000000) {
                    element.textContent = `$${(currentValue / 1000000000000).toFixed(1)}T+`;
                } else if (currentValue >= 1000000000) {
                    element.textContent = `$${(currentValue / 1000000000).toFixed(1)}B+`;
                } else if (currentValue >= 1000000) {
                    element.textContent = `$${(currentValue / 1000000).toFixed(1)}M+`;
                } else {
                    element.textContent = `$${currentValue.toLocaleString()}+`;
                }
                
                console.log('Market cap now:', element.textContent);
                duration += speed;
                
                if (duration < maxDuration) {
                    setTimeout(step, speed);
                } else {
                    // After animation, show infinity symbol
                    setTimeout(() => {
                        element.textContent = '$∞';
                        element.style.background = 'linear-gradient(45deg, #FFD700, #FF6B6B, #4ECDC4, #45B7D1)';
                        element.style.backgroundSize = '400% 400%';
                        element.style.animation = 'rainbow 2s linear infinite';
                        element.style.webkitBackgroundClip = 'text';
                        element.style.webkitTextFillColor = 'transparent';
                        element.style.fontSize = '3rem';
                        element.style.transform = 'scale(1.2)';
                        element.style.transition = 'all 0.5s ease';
                    }, 500);
                }
            };
            
            step();
        };

        // Animate counters when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const statLabel = element.parentElement.querySelector('.stat-label').textContent;
                    
                    console.log('Animating stat:', statLabel, 'Element:', element.textContent);
                    
                    if (statLabel.includes('Market Cap')) {
                        console.log('Starting market cap animation');
                        // Special animation for market cap
                        animateMarketCap(element);
                    } else {
                        // Regular animation for other stats
                        const finalValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
                        animateValue(element, 0, finalValue, 2000);
                    }
                    
                    observer.unobserve(element);
                }
            });
        });

        document.querySelectorAll('.stat-number').forEach(stat => {
            observer.observe(stat);
        });
        
        // Force test the market cap animation after 3 seconds
        setTimeout(() => {
            const marketCapElement = document.getElementById('marketCap');
            if (marketCapElement) {
                console.log('Forcing market cap animation test');
                animateMarketCap(marketCapElement);
            }
        }, 3000);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Add animation to feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Add animation to timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });
    }
}

// Smooth scrolling functions
function scrollToGenerator() {
    document.getElementById('generator').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToAbout() {
    document.getElementById('about').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Global functions for buttons
function randomizeFace() {
    if (window.awesomeGenerator) {
        window.awesomeGenerator.randomizeFace();
    }
}

function downloadFace() {
    if (window.awesomeGenerator) {
        window.awesomeGenerator.downloadFace();
    }
}

function shareFace() {
    if (window.awesomeGenerator) {
        window.awesomeGenerator.shareFace();
    }
}

function updateBackground() {
    if (window.awesomeGenerator) {
        window.awesomeGenerator.updateBackground();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.awesomeGenerator = new AwesomeFaceGenerator();
    
    // Add some fun interactions
    const mainAwesomeFace = document.getElementById('mainAwesomeFace');
    if (mainAwesomeFace) {
        mainAwesomeFace.addEventListener('click', () => {
            mainAwesomeFace.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                mainAwesomeFace.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    }

    // Add floating animation to coins
    const coins = document.querySelectorAll('.coin');
    coins.forEach((coin, index) => {
        coin.addEventListener('click', () => {
            coin.style.animation = 'none';
            coin.style.transform = 'translateY(-50px) scale(1.5)';
            setTimeout(() => {
                coin.style.animation = 'floatAround 4s ease-in-out infinite';
                coin.style.transform = '';
            }, 1000);
        });
    });

    // Add subtle parallax effect to hero section (reduced to prevent clipping)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.1; // Reduced from 0.5 to 0.1
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add typing effect to hero title
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            typeWriter();
        }, index * 500);
    });
});

// Add some Easter eggs
let clickCount = 0;
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('awesome-face') || e.target.classList.contains('awesome-face-large')) {
        clickCount++;
        if (clickCount === 5) {
            // Secret message
            const secretDiv = document.createElement('div');
            secretDiv.innerHTML = '🎉 You found the secret! You are truly AWESOME! 🎉';
            secretDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #FFD700, #FF6B6B);
                color: white;
                padding: 2rem;
                border-radius: 20px;
                font-size: 1.5rem;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: bounce 0.5s ease;
            `;
            document.body.appendChild(secretDiv);
            setTimeout(() => {
                secretDiv.remove();
                clickCount = 0;
            }, 3000);
        }
    }
});

// Copy contract address function
function copyContract() {
    const contractAddress = '3mDgKPVyguLqs2dudZ36bTRha4TDgfar6fGm8bm8xCoF';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(contractAddress).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopy(contractAddress);
        });
    } else {
        fallbackCopy(contractAddress);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Failed to copy contract address');
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #4ECDC4, #45B7D1);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    successMsg.textContent = '📋 Contract Address Copied!';
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMsg);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successMsg);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}
