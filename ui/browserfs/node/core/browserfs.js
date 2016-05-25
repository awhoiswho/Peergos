"use strict";
var buffer = require('buffer');
var fs = require('./node_fs');
var path = require('path');
var emscripten_fs_1 = require('../generic/emscripten_fs');
exports.EmscriptenFS = emscripten_fs_1["default"];
var FileSystem = require('./backends');
exports.FileSystem = FileSystem;
var BFSUtils = require('./util');
if (process['initializeTTYs']) {
    process['initializeTTYs']();
}
function install(obj) {
    obj.Buffer = Buffer;
    obj.process = process;
    var oldRequire = obj.require != null ? obj.require : null;
    obj.require = function (arg) {
        var rv = BFSRequire(arg);
        if (rv == null) {
            return oldRequire.apply(null, Array.prototype.slice.call(arguments, 0));
        }
        else {
            return rv;
        }
    };
}
exports.install = install;
function registerFileSystem(name, fs) {
    FileSystem[name] = fs;
}
exports.registerFileSystem = registerFileSystem;
function BFSRequire(module) {
    switch (module) {
        case 'fs':
            return fs;
        case 'path':
            return path;
        case 'buffer':
            return buffer;
        case 'process':
            return process;
        case 'bfs_utils':
            return BFSUtils;
        default:
            return FileSystem[module];
    }
}
exports.BFSRequire = BFSRequire;
function initialize(rootfs) {
    return fs.initialize(rootfs);
}
exports.initialize = initialize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlcmZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYnJvd3NlcmZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxJQUFPLE1BQU0sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUNsQyxJQUFPLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FBQztBQUNqQyxJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUU5Qiw4QkFBeUIsMEJBQTBCLENBQUMsQ0FBQTtBQTJFNUMsb0JBQVk7QUExRXBCLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBMEVuQixrQkFBVTtBQXpFaEMsSUFBWSxRQUFRLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7QUFDOUIsQ0FBQztBQWdCRCxpQkFBd0IsR0FBUTtJQUM5QixHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNwQixHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUUxRCxHQUFHLENBQUMsT0FBTyxHQUFHLFVBQVMsR0FBVztRQUNoQyxJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDWixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWJlLGVBQU8sVUFhdEIsQ0FBQTtBQUVELDRCQUFtQyxJQUFZLEVBQUUsRUFBcUM7SUFDN0UsVUFBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNoQyxDQUFDO0FBRmUsMEJBQWtCLHFCQUVqQyxDQUFBO0FBUUQsb0JBQTJCLE1BQWM7SUFDdkMsTUFBTSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNkLEtBQUssSUFBSTtZQUNQLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDWixLQUFLLE1BQU07WUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsS0FBSyxRQUFRO1lBRVgsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixLQUFLLFNBQVM7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pCLEtBQUssV0FBVztZQUNkLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbEI7WUFDRSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7QUFDSCxDQUFDO0FBaEJlLGtCQUFVLGFBZ0J6QixDQUFBO0FBUUQsb0JBQTJCLE1BQThCO0lBQ3ZELE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGZSxrQkFBVSxhQUV6QixDQUFBO0FBRWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEJyb3dzZXJGUydzIG1haW4gbW9kdWxlLiBUaGlzIGlzIGV4cG9zZWQgaW4gdGhlIGJyb3dzZXIgdmlhIHRoZSBCcm93c2VyRlMgZ2xvYmFsLlxyXG4gKi9cclxuXHJcbmltcG9ydCBidWZmZXIgPSByZXF1aXJlKCdidWZmZXInKTtcclxuaW1wb3J0IGZzID0gcmVxdWlyZSgnLi9ub2RlX2ZzJyk7XHJcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG5pbXBvcnQgZmlsZV9zeXN0ZW0gPSByZXF1aXJlKCcuL2ZpbGVfc3lzdGVtJyk7XHJcbmltcG9ydCBFbXNjcmlwdGVuRlMgZnJvbSAnLi4vZ2VuZXJpYy9lbXNjcmlwdGVuX2ZzJztcclxuaW1wb3J0ICogYXMgRmlsZVN5c3RlbSBmcm9tICcuL2JhY2tlbmRzJztcclxuaW1wb3J0ICogYXMgQkZTVXRpbHMgZnJvbSAnLi91dGlsJztcclxuXHJcbmlmIChwcm9jZXNzWydpbml0aWFsaXplVFRZcyddKSB7XHJcbiAgcHJvY2Vzc1snaW5pdGlhbGl6ZVRUWXMnXSgpO1xyXG59XHJcblxyXG4vKipcclxuICogSW5zdGFsbHMgQnJvd3NlckZTIG9udG8gdGhlIGdpdmVuIG9iamVjdC5cclxuICogV2UgcmVjb21tZW5kIHRoYXQgeW91IHJ1biBpbnN0YWxsIHdpdGggdGhlICd3aW5kb3cnIG9iamVjdCB0byBtYWtlIHRoaW5nc1xyXG4gKiBnbG9iYWwsIGFzIGluIE5vZGUuXHJcbiAqXHJcbiAqIFByb3BlcnRpZXMgaW5zdGFsbGVkOlxyXG4gKlxyXG4gKiAqIEJ1ZmZlclxyXG4gKiAqIHByb2Nlc3NcclxuICogKiByZXF1aXJlICh3ZSBtb25rZXktcGF0Y2ggaXQpXHJcbiAqXHJcbiAqIFRoaXMgYWxsb3dzIHlvdSB0byB3cml0ZSBjb2RlIGFzIGlmIHlvdSB3ZXJlIHJ1bm5pbmcgaW5zaWRlIE5vZGUuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIGluc3RhbGwgdGhpbmdzIG9udG8gKGUuZy4gd2luZG93KVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGwob2JqOiBhbnkpIHtcclxuICBvYmouQnVmZmVyID0gQnVmZmVyO1xyXG4gIG9iai5wcm9jZXNzID0gcHJvY2VzcztcclxuICB2YXIgb2xkUmVxdWlyZSA9IG9iai5yZXF1aXJlICE9IG51bGwgPyBvYmoucmVxdWlyZSA6IG51bGw7XHJcbiAgLy8gTW9ua2V5LXBhdGNoIHJlcXVpcmUgZm9yIE5vZGUtc3R5bGUgY29kZS5cclxuICBvYmoucmVxdWlyZSA9IGZ1bmN0aW9uKGFyZzogc3RyaW5nKSB7XHJcbiAgICB2YXIgcnYgPSBCRlNSZXF1aXJlKGFyZyk7XHJcbiAgICBpZiAocnYgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gb2xkUmVxdWlyZS5hcHBseShudWxsLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHJ2O1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckZpbGVTeXN0ZW0obmFtZTogc3RyaW5nLCBmczogZmlsZV9zeXN0ZW0uRmlsZVN5c3RlbUNvbnN0cnVjdG9yKSB7XHJcbiAgKDxhbnk+IEZpbGVTeXN0ZW0pW25hbWVdID0gZnM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBCRlNSZXF1aXJlKG1vZHVsZTogJ2ZzJyk6IHR5cGVvZiBmcztcclxuZXhwb3J0IGZ1bmN0aW9uIEJGU1JlcXVpcmUobW9kdWxlOiAncGF0aCcpOiB0eXBlb2YgcGF0aDtcclxuZXhwb3J0IGZ1bmN0aW9uIEJGU1JlcXVpcmUobW9kdWxlOiAnYnVmZmVyJyk6IHR5cGVvZiBidWZmZXI7XHJcbmV4cG9ydCBmdW5jdGlvbiBCRlNSZXF1aXJlKG1vZHVsZTogJ3Byb2Nlc3MnKTogdHlwZW9mIHByb2Nlc3M7XHJcbmV4cG9ydCBmdW5jdGlvbiBCRlNSZXF1aXJlKG1vZHVsZTogJ2Jmc191dGlscycpOiB0eXBlb2YgQkZTVXRpbHM7XHJcbmV4cG9ydCBmdW5jdGlvbiBCRlNSZXF1aXJlKG1vZHVsZTogc3RyaW5nKTogYW55O1xyXG5leHBvcnQgZnVuY3Rpb24gQkZTUmVxdWlyZShtb2R1bGU6IHN0cmluZyk6IGFueSB7XHJcbiAgc3dpdGNoKG1vZHVsZSkge1xyXG4gICAgY2FzZSAnZnMnOlxyXG4gICAgICByZXR1cm4gZnM7XHJcbiAgICBjYXNlICdwYXRoJzpcclxuICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICBjYXNlICdidWZmZXInOlxyXG4gICAgICAvLyBUaGUgJ2J1ZmZlcicgbW9kdWxlIGhhcyAnQnVmZmVyJyBhcyBhIHByb3BlcnR5LlxyXG4gICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgY2FzZSAncHJvY2Vzcyc6XHJcbiAgICAgIHJldHVybiBwcm9jZXNzO1xyXG4gICAgY2FzZSAnYmZzX3V0aWxzJzpcclxuICAgICAgcmV0dXJuIEJGU1V0aWxzO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIEZpbGVTeXN0ZW1bbW9kdWxlXTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBZb3UgbXVzdCBjYWxsIHRoaXMgZnVuY3Rpb24gd2l0aCBhIHByb3Blcmx5LWluc3RhbnRpYXRlZCByb290IGZpbGUgc3lzdGVtXHJcbiAqIGJlZm9yZSB1c2luZyBhbnkgZmlsZSBzeXN0ZW0gQVBJIG1ldGhvZC5cclxuICogQHBhcmFtIHtCcm93c2VyRlMuRmlsZVN5c3RlbX0gcm9vdEZTIC0gVGhlIHJvb3QgZmlsZXN5c3RlbSB0byB1c2UgZm9yIHRoZVxyXG4gKiAgIGVudGlyZSBCcm93c2VyRlMgZmlsZSBzeXN0ZW0uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShyb290ZnM6IGZpbGVfc3lzdGVtLkZpbGVTeXN0ZW0pIHtcclxuICByZXR1cm4gZnMuaW5pdGlhbGl6ZShyb290ZnMpO1xyXG59XHJcblxyXG5leHBvcnQge0Vtc2NyaXB0ZW5GUywgRmlsZVN5c3RlbX07XHJcbiJdfQ==