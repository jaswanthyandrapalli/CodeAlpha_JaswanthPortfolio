// Fixed Terminal Engine
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('cmd-input');
    const prompt = document.getElementById('prompt');
    const container = document.getElementById('terminal-container');

    const commands = {
        'help': 
        'Available: {cd about} ,{cd projects} ,{cd skills} ,{cd certifications} ,{clear}',
        'cd about': () => window.location.href = 'about.html',
        'cd projects': () => window.location.href = 'projects.html',
        'cd skills': () => window.location.href = 'skills.html',
        'cd certifications': () => window.location.href = 'certifications.html',
        'clear': () => { output.innerHTML = ''; return ''; }
    };

    let history = [];
    let historyIndex = -1;

    function addOutput(text) {
        output.innerHTML += text + '<br>';
        output.scrollTop = output.scrollHeight;
    }

    function typeEffect(text, callback) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                output.innerHTML += text.charAt(i);
                output.scrollTop = output.scrollHeight;
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, 30);
    }

    function executeCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        if (!trimmed) return;

        history.unshift(trimmed);
        historyIndex = -1;

        addOutput(`${prompt.textContent}${escapeHtml(cmd)}`);
        
        if (commands[trimmed]) {
            if (typeof commands[trimmed] === 'function') {
                addOutput('<span style="color:#00aa00;">Loading...</span>');
                setTimeout(commands[trimmed], 800);
            } else {
                typeEffect(commands[trimmed]);
            }
        } else {
            addOutput('<span style="color:#ff4444;">bash: ' + escapeHtml(trimmed) + ': command not found</span>');
        }
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value;
            executeCommand(cmd);
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            } else {
                historyIndex = -1;
                input.value = '';
            }
            e.preventDefault();
        }
    });

    // Welcome - only show if not already displayed
    if (!window.skipDefaultWelcome) {
        typeEffect('Portfolio CMD v2.0 loaded', () => {
            typeEffect('\\nType help for navigation.', () => addOutput(''));
        });
    }

    container.addEventListener('click', () => input.focus());

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
