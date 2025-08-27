// Simple vanilla JS for leaderboard functionality with CSV data

// Update status bar time to current time
function updateStatusTime() {
  const statusTime = document.querySelector('.status-time');
  if (statusTime) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    statusTime.textContent = timeString;
  }
}

// CSV data parsing function
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((header, index) => {
      row[header.trim()] = values[index] ? values[index].trim() : '';
    });
    data.push(row);
  }
  
  return data;
}

// Convert time format MM:SS:MS to total milliseconds
function timeToMilliseconds(timeString) {
  const parts = timeString.split(':');
  if (parts.length !== 3) return 0;
  
  const minutes = parseInt(parts[0]) || 0;
  const seconds = parseInt(parts[1]) || 0;
  const centiseconds = parseInt(parts[2]) || 0;
  
  // Convert to total milliseconds
  return (minutes * 60 * 1000) + (seconds * 1000) + (centiseconds * 10);
}

// Sort leaderboard data by time (Tiempo field) - ascending order (menor a mayor)
function sortLeaderboardData(data) {
  return data.sort((a, b) => timeToMilliseconds(a.Tiempo) - timeToMilliseconds(b.Tiempo));
}

// Load CSV data and render leaderboard
async function loadLeaderboardData() {
  try {
    const response = await fetch('leaderboard.csv');
    const csvText = await response.text();
    const data = parseCSV(csvText);
    const sortedData = sortLeaderboardData(data);
    
    renderPodium(sortedData.slice(0, 3));
    renderLeaderboardList(sortedData.slice(3, 10)); // Mostrar del 4to al 10mo lugar
    
    // Add interactive effects after rendering
    setTimeout(() => {
      addInteractiveEffects();
    }, 100);
    
    console.log('Leaderboard data loaded successfully');
  } catch (error) {
    console.error('Error loading CSV data:', error);
    // Fallback: show message or use static data
    showFallbackMessage();
  }
}

// Show fallback message when CSV cannot be loaded
function showFallbackMessage() {
  const leaderboardContainer = document.querySelector('.leaderboard-container');
  if (leaderboardContainer) {
    leaderboardContainer.innerHTML = `
      <div style="text-align: center; padding: 20px; color: var(--gray-2);">
        <p>Unable to load leaderboard data.</p>
        <p>Please make sure the CSV file is accessible.</p>
      </div>
    `;
  }
}

// Render top 3 podium
function renderPodium(topThree) {
  const podiumContainer = document.querySelector('.podium-container');
  if (!podiumContainer || topThree.length < 3) return;
  
  const podiumData = [
    { data: topThree[1], class: 'second-place', order: 1, rank: 2 }, // 2nd place
    { data: topThree[0], class: 'first-place', order: 2, rank: 1 },  // 1st place  
    { data: topThree[2], class: 'third-place', order: 3, rank: 3 }   // 3rd place
  ];
  
  podiumContainer.innerHTML = '';
  
  podiumData.forEach((item, index) => {
    const position = document.createElement('div');
    position.className = `podium-position ${item.class}`;
    position.style.order = item.order;
    
    const profileImage = item.data.Profile || 'img/profile.webp';
    
    position.innerHTML = `
      ${item.rank === 1 ? '<div class="crown-icon">👑</div>' : ''}
      <div class="profile-image-container">
        <img src="${profileImage}" alt="${item.data.Jugador}" class="profile-image" onerror="this.src='img/profile.webp'">
        <div class="rank-badge">
          <span class="rank-number">${item.rank}</span>
        </div>
      </div>
      <div class="podium-info">
        <h3 class="participant-name">${item.data.Jugador}</h3>
        <div class="points-info">
          <span class="workout-icon">💪</span>
          <span class="points">${item.data.Tiempo}</span>
        </div>
      </div>
    `;
    
    podiumContainer.appendChild(position);
  });
}

// Render leaderboard list (positions 4-10 only)
function renderLeaderboardList(data) {
  const leaderboardContainer = document.querySelector('.leaderboard-container');
  if (!leaderboardContainer) return;
  
  leaderboardContainer.innerHTML = '';
  
  // Los datos ya vienen filtrados desde posición 4 en adelante
  data.forEach((participant, index) => {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    
    const profileImage = participant.Profile || 'img/profile.webp';
    const rankPosition = index + 4; // Posición real en el ranking (4, 5, 6, 7, 8, 9, 10)
    
    item.innerHTML = `
      <div class="rank-position">${rankPosition}</div>
      <div class="participant-info">
        <img src="${profileImage}" alt="${participant.Jugador}" class="participant-avatar" onerror="this.src='img/profile.webp'">
        <span class="participant-name">${participant.Jugador}</span>
      </div>
      <div class="participant-points">${participant.Tiempo}</div>
    `;
    
    leaderboardContainer.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  
  // Update status time to current time
  updateStatusTime();
  
  // Update time every minute
  setInterval(updateStatusTime, 60000);
  
  // Load CSV data on page load
  loadLeaderboardData();
  
  // Refresh button functionality
  const refreshButton = document.querySelector('.refresh-button');
  
  if (refreshButton) {
    refreshButton.addEventListener('click', function() {
      // Refresh leaderboard data
      console.log('Refreshing leaderboard...');
      animateRefreshButton(refreshButton);
      refreshLeaderboard();
    });
  }

  // Add subtle animations for better UX
  function animateRefreshButton(button) {
    // Rotate animation for refresh
    button.style.transform = 'rotate(360deg) scale(0.95)';
    button.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
      button.style.transform = 'rotate(0deg) scale(1)';
    }, 500);
  }

  // Add hover effects for interactive elements (applied after CSV load)
  function addInteractiveEffects() {
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    
    leaderboardItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        // Apply current-user styling on hover for visual emphasis
        this.classList.add('current-user');
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        this.style.transition = 'all 0.2s ease';
      });
      
      item.addEventListener('mouseleave', function() {
        // Remove current-user styling when not hovering
        this.classList.remove('current-user');
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    });

    // Animate entries on load
    animateElements();
  }

  // Animate podium and leaderboard entries
  function animateElements() {
    const podiumPositions = document.querySelectorAll('.podium-position');
    
    podiumPositions.forEach((position, index) => {
      position.style.opacity = '0';
      position.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        position.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        position.style.opacity = '1';
        position.style.transform = 'translateY(0)';
      }, index * 200 + 300);
    });

    // Animate leaderboard items
    const leaderboardItemsLoad = document.querySelectorAll('.leaderboard-item');
    
    leaderboardItemsLoad.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 100 + 800);
    });
  }

  // Simple data refresh function
  function refreshLeaderboard() {
    console.log('Refreshing leaderboard data...');
    loadLeaderboardData().then(() => {
      addInteractiveEffects();
      console.log('Leaderboard data refreshed');
    });
  }

  // Manual refresh button (could be added to UI)
  window.refreshLeaderboard = refreshLeaderboard;

  console.log('Workout Leaderboard initialized successfully');
});