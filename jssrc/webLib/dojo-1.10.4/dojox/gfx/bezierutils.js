//>>built

define("dojox/gfx/bezierutils", ["./_base"], function (gfx) {
    var bu = gfx.bezierutils = {}, error = 0.1;
    var tAtLength = bu.tAtLength = function (points, length) {
        var t = 0, quadratic = points.length == 6, currentLen = 0, splitCount = 0, splitFunc = quadratic ? splitQBezierAtT : splitBezierAtT;
        var _compute = function (p, error) {
            var pLen = 0;
            for (var i = 0; i < p.length - 2; i += 2) {
                pLen += distance(p[i], p[i + 1], p[i + 2], p[i + 3]);
            }
            var chord = quadratic ? distance(points[0], points[1], points[4], points[5]) : distance(points[0], points[1], points[6], points[7]);
            if (pLen - chord > error || currentLen + pLen > length + error) {
                ++splitCount;
                var newbezier = splitFunc(p, 0.5);
                _compute(newbezier[0], error);
                if (Math.abs(currentLen - length) <= error) {
                    return;
                }
                _compute(newbezier[1], error);
                return;
            }
            currentLen += pLen;
            t += 1 / (1 << splitCount);
        };
        if (length) {
            _compute(points, 0.5);
        }
        return t;
    };
    var computeLength = bu.computeLength = function (points) {
        var quadratic = points.length == 6, pLen = 0;
        for (var i = 0; i < points.length - 2; i += 2) {
            pLen += distance(points[i], points[i + 1], points[i + 2], points[i + 3]);
        }
        var chord = quadratic ? distance(points[0], points[1], points[4], points[5]) : distance(points[0], points[1], points[6], points[7]);
        if (pLen - chord > error) {
            var newBeziers = quadratic ? splitQBezierAtT(points, 0.5) : splitCBezierAtT(points, 0.5);
            var length = computeLength(newBeziers[0], quadratic);
            length += computeLength(newBeziers[1], quadratic);
            return length;
        }
        return pLen;
    };
    var distance = bu.distance = function (x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    };
    var splitQBezierAtT = function (points, t) {
        var r = 1 - t, r2 = r * r, t2 = t * t, p1x = points[0], p1y = points[1], cx = points[2], cy = points[3], p2x = points[4], p2y = points[5], ax = r * p1x + t * cx, ay = r * p1y + t * cy, bx = r * cx + t * p2x, by = r * cy + t * p2y, px = r2 * p1x + 2 * r * t * cx + t2 * p2x, py = r2 * p1y + 2 * r * t * cy + t2 * p2y;
        return [[p1x, p1y, ax, ay, px, py], [px, py, bx, by, p2x, p2y]];
    };
    var splitCBezierAtT = function (points, t) {
        var r = 1 - t, r2 = r * r, r3 = r2 * r, t2 = t * t, t3 = t2 * t, p1x = points[0], p1y = points[1], c1x = points[2], c1y = points[3], c2x = points[4], c2y = points[5], p2x = points[6], p2y = points[7], ax = r * p1x + t * c1x, ay = r * p1y + t * c1y, cx = r * c2x + t * p2x, cy = r * c2y + t * p2y, mx = r2 * p1x + 2 * r * t * c1x + t2 * c2x, my = r2 * p1y + 2 * r * t * c1y + t2 * c2y, nx = r2 * c1x + 2 * r * t * c2x + t2 * p2x, ny = r2 * c1y + 2 * r * t * c2y + t2 * p2y, px = r3 * p1x + 3 * r2 * t * c1x + 3 * r * t2 * c2x + t3 * p2x, py = r3 * p1y + 3 * r2 * t * c1y + 3 * r * t2 * c2y + t3 * p2y;
        return [[p1x, p1y, ax, ay, mx, my, px, py], [px, py, nx, ny, cx, cy, p2x, p2y]];
    };
    var splitBezierAtT = bu.splitBezierAtT = function (points, t) {
        return points.length == 6 ? splitQBezierAtT(points, t) : splitCBezierAtT(points, t);
    };
    return bu;
});

