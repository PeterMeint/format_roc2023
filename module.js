// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * format_roc2023_renderer
 *
 * @package    format_roc2023
 * @author     Peter Meint Heida
 * @copyright  2023 Peter Meint Heida
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

M.format_roc2023 = M.format_roc2023 || {
    ourYUI: null,
    numsections: 0
};

M.format_roc2023.init = function(Y, numsections, currentsection, courseid) {
    this.ourYUI = Y;
    this.numsections = parseInt(numsections);
    document.getElementById('buttonsection_roc2023container').style.display = 'table';

    var findHash = function (href) {
        var id = null;
        if (href.indexOf('#section-') !== 0) {
            var split = href.split('#section-');
            id = split[1];
        }
        return id;
    };

    var hash = findHash(window.location.href);
    if (hash) {
        currentsection = hash;
    }

    if (currentsection) {
        M.format_roc2023.show(currentsection, courseid);
    }

    Y.delegate('click', function (e) {
        var href = e.currentTarget.get('href');
        currentsection = findHash(href);
        M.format_roc2023.show(currentsection, courseid)
    }, '[data-region="drawer"]', '[data-type="30"]');

};

M.format_roc2023.hide = function() {
    for (var i = 1; i <= this.numsections; i++) {
        if (document.getElementById('buttonsection_roc2023-' + i) != undefined) {
            var buttonsection_roc2023 = document.getElementById('buttonsection_roc2023-' + i);
            buttonsection_roc2023.setAttribute('class', buttonsection_roc2023.getAttribute('class').replace('sectionvisible', ''));
            document.getElementById('section-' + i).style.display = 'none';
        }
    }
};

M.format_roc2023.show = function(id, courseid) {
    this.hide();
    if (id > 0) {
        var buttonsection_roc2023 = document.getElementById('buttonsection_roc2023-' + id);
        var currentsection = document.getElementById('section-' + id);
        if (buttonsection_roc2023 && currentsection) {
            buttonsection_roc2023.setAttribute('class', buttonsection_roc2023.getAttribute('class') + ' sectionvisible');
            currentsection.style.display = 'block';
            document.cookie = 'sectionvisible_' + courseid + '=' + id + '; path=/';
            M.format_roc2023.h5p();
        }
    }
};

M.format_roc2023.h5p = function() {
    window.h5pResizerInitialized = false;
    var iframes = document.getElementsByTagName('iframe');
    var ready = {
        context: 'h5p',
        action: 'ready'
    };
    for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].src.indexOf('h5p') !== -1) {
            iframes[i].contentWindow.postMessage(ready, '*');
        }
    }
};
