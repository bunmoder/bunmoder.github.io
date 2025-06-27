// Command related constants

export const COMMANDS = [
	'about', 'projects', 'contact', 'clear', 'help', 'ascii', 'fortune', 'theme', 'date', 'echo', 'scan', 'ls', 'cat', 'promise.sh'
];

export const THEMES = ['signalis', 'bunny', 'crt', 'nightmare', 'shark'];

export const ASCII_ARTS = [
	`  /)/)
 ( . .)
 ( づ♡`,

`⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣰⠋⣷⠀⠀⠀⠀⠀ ⠀⠀⢀⡼⢲⠀⠀⠀⠀⠀⠀⠀⠀ ⢀⡖⢳⠄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⠃⢀⣿⠖⢳⡆⠀⠀⠀⢀⡞⠀⣸⣠⠤⡄⠀⠀⠀⠀⢠⡟⠁⣸⣤⠶⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢰⡇⣴⡟⠁⠀⡼⠁⠀⠀⠀⡾⢀⣴⠏⠀⢠⠇⠀⠀⠀⠀⡾⢀⣴⠋⠀⢰⠇⠀⠀⠀⠀⠀⠀
⠀⠀⣀⠴⠋⠉⠘⢹⡇⢀⡼⠳⠤⣤⡤⠒⠣⢟⡇⠀⢠⣏⣀⡀⣠⠴⠚⠣⢯⡇⠀⣠⢯⣄⣀⠀⠀⠀⠀⠀
⠀⡼⠃⢀⣄⠀⠀⠘⠓⠋⠀⢠⡞⠁⠀⠀⠀⠘⢧⠴⠋⠀⢠⠟⠁⠀⠀⠀⠘⠧⠞⠁⠀⠀⠈⠙⢦⡀⠀⠀
⢸⡇⠀⠈⠉⠀⠀⠀⠀⠀⢠⣏⡀⠐⠟⠃⠀⠀⠀⠀⠀⢠⣏⠀⠘⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠹⡄⠀
⠀⠙⠦⣤⣀⣤⠤⠀⠀⠀⠈⠳⣄⡀⠀⠀⢀⠀⠀⠀⠀⠀⠻⢆⣀⢀⡀⣀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⣿⠀
⠀⠀⠀⢻⡀⠀⡀⠀⠀⠀⠀⠀⠀⢻⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⢹⡉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⡿⣄
⠀⠀⠀⢨⠇⢀⡿⠀⠀⢀⣀⡤⠄⠈⣧⠀⢲⠀⠀⠀⠀⢀⡀⠀⠈⣷⠀⢸⡀⠀⠀⠀⣀⡀⠀⠀⠀ ⠀⣡⠟
⠀⠀⠀⠙⠒⢯⣀⣠⠴⠻⢧⣄⠤⠼⢥⣴⠋⠀⢀⡴⡟⠉⢀⣀⣸⡧⣴⠋⢀⣀⡴⣟⣁⣀⣀⡠⠴⠊⠁⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠉⠁⠀⠉⠉⠉⠀⠀⠀⠈⠉⠉⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠀`,

`⠀⢀⣀⠀⠀⠀⠀⠀⢀⣀⠀
⢠⣯⢬⣷⡀⠀⠀⣴⡯⢌⣧
⠸⣿⠀⠹⣷⠀⢸⡝⠀⢸⡿
⠀⠻⣧⣀⣿⣦⣼⡁⣠⣿⠃
⠀⢀⡾⠋⠀⠀⠀⠈⣙⣯⠀
⠀⣾⠀⠀⠀⠀⠀⠀⠀⠸⡆
⢰⡧⢄⢰⡆⠀⢰⡆⡠⢄⣧
⠀⠳⣼⣤⣤⣤⣤⣤⣧⠾⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

`                                                        ★ ⁺.

                                        (\\_(\\    /)_/)
                                        (      )  (      )
                                       /     |     |      \\
                                      ( O   |    |    O )`
];

export const FORTUNES = [
	'The bunny sees all.',
	'You will find a carrot soon.',
	'A glitch in the system is a feature.',
	'01000010 01110101 01101110 01101110 01111001',
	'You are not alone in the terminal.',
	'Connection to rabbit server unstable…',
];

export const FAKE_FILES = {
	'readme.txt': 'Welcome to the bunny terminal! Hop around and explore.',
	'bunny.txt': `bunny.txt

Bunny Facts

1. Bunnies do a happy little jump called a "binky" when they're excited.
2. Their teeth never stop growing, so they need to chew on things to keep them healthy.
3. A group of bunnies is called a "fluffle" (really).
4. Bunnies can be litter trained, just like cats.
5. When a bunny flops onto its side and looks like it fainted, it's actually super relaxed.
`,
	'secret.log': `[secret.log]

2024-06-19 01:59:22

Replica log: The bunny showed up again tonight, right by the terminal. For a second, I thought I saw the Penrose rotating in her eyes. I tried tuning the radio, but all I got was static and a faint transmission: "Gestalt status: unknown." 

I left a red keycard next to the carrot. Only the carrot was gone by morning.
[END OF LOG]`,
	'promise.sh': 'echo "REMEMBER OUR PROMISE"',
}; 