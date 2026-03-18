const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const regex = /<Image[\s\S]*?src="\/images\/logo\.png"[\s\S]*?\/>/g;
            const newContent = content.replace(regex, '<div className="text-xl md:text-2xl font-bold text-[#a78a41] uppercase tracking-wider my-auto">Prestige Kollur</div>');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Replaced in ' + fullPath);
            }
        }
    });
}
replaceInDir('/Users/namanbansal/programming/star_estate/Landing Pages/lp-prestige-kollur/app');
