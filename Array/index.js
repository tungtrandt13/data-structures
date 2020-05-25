
class ArrayRewrite {

    constructor(capacity, element) {
        capacity = Number.isInteger(capacity) && capacity > 0 ? capacity : 16;
        element = !!element ? element : 0;
        this.defaultCapacity = 16;
        this._array = Array(capacity).fill(element);
        this._element = element;
        this._capacity = capacity;
        this._size = 0;
    }

    value() {
        return this._array;
    }

    size() {
        return this._size;
    }

    capacity() {
        return this._capacity;
    }

    is_empty() {
        if (this._size == 0) {
            return true;
        }
        return false
    }

    _isInSizeRange(index) {
        if (isNaN(index) || index < 0 || index >= this._size) {
            return false;
        };
        return true;
    }

    at(index) {
        index = Number(index);
        if (!_isInSizeRange(index)) {
            return undefined;
        }

        return this._array[index];
    }

    push(item) {
        if (typeof item === 'undefined') return;

        this._upSize();
        this._array[this._size - 1] = item;
    }

    insert(item, index) {
        index = Number(index);
        if (isNaN(index)) return;
        if (typeof item === 'undefined' || !this._isInSizeRange(index)) {
            return;
        } else if (index > this._size) {
            return this.push(item);
        }

        this._upSize();
        for (let i = this._size; i > index; i--) {
            this._array[i] = this._array[i - 1];
        }
        this._array[index] = item;
    }

    prepend(item) {
        if (typeof item === 'undefined') return;
        this._upSize();
        for (let i = this._size; i > 0; i--) {
            this._array[i] = this._array[i - 1];
        }
        this._array[0] = item;
    }

    pop() {
        if (this._size === 0) return false;
        this._array[this._size] = this._element;
        this._size--;
        this._downSize();
        return true;
    }

    delete(index) {
        index = Number(index);
        if (!this._isInSizeRange(index) || this._size === 0) return false;
        for (let i = index; i < this._size; i++) {
            this._array[i] = this._array[i+1];
        }
        this._size--;
        this._downSize();
        return true;
    }

    remove(item) {
        if (typeof item === 'undefined') return;
        for (let i = this._size; i >= 0; i--) {
            if (this._array[i] === item) {
                this.delete(i);
            }
        }
    }

    find(item) {
        if (typeof item === 'undefined') return;
        for (let i = 0; i < this._size; i++) {
            if (this._array[i] === item){
                return i;
            }
        }
        return -1;
    }

    resize()

    _upSize() {
        this._size++;
        if (this._size === this._capacity) {
            this._capacity *= 2;
            let arrayUpgrade = Array(this._capacity).fill(this._element);
            for (let i = 0; i <= this._size; i++) {
                arrayUpgrade[i] = this._array[i];
            }
            this._array = arrayUpgrade;
        }
    }

    _downSize() {
        if (this._size <= this._capacity/4) {
            this._capacity = Number.parseInt(this._capacity / 2)
            let arrayDowngrade = Array(this._capacity).fill(this._element);
            for (let i = 0; i <= this._size; i++) {
                arrayDowngrade[i] = this._array[i];
            }
            this._array = arrayDowngrade;
        }
    }
}
