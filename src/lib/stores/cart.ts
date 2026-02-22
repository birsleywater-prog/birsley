import { writable, derived } from 'svelte/store';

export interface CartItem {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    price: number;
    volume?: string | null;
    quantity: number;
}

function createCartStore() {
    // Load from localStorage
    function loadCart(): CartItem[] {
        if (typeof window === 'undefined') return [];
        try {
            const saved = localStorage.getItem('bizaree_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    const { subscribe, set, update } = writable<CartItem[]>(loadCart());

    function saveCart(items: CartItem[]) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('bizaree_cart', JSON.stringify(items));
        }
    }

    return {
        subscribe,
        addItem(product: Omit<CartItem, 'quantity'>, qty = 1) {
            update(items => {
                const existing = items.find(i => i.id === product.id);
                let newItems: CartItem[];
                if (existing) {
                    newItems = items.map(i =>
                        i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
                    );
                } else {
                    newItems = [...items, { ...product, quantity: qty }];
                }
                saveCart(newItems);
                return newItems;
            });
        },
        removeItem(id: number) {
            update(items => {
                const newItems = items.filter(i => i.id !== id);
                saveCart(newItems);
                return newItems;
            });
        },
        updateQuantity(id: number, quantity: number) {
            update(items => {
                const newItems = quantity <= 0
                    ? items.filter(i => i.id !== id)
                    : items.map(i => i.id === id ? { ...i, quantity } : i);
                saveCart(newItems);
                return newItems;
            });
        },
        clearCart() {
            set([]);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('bizaree_cart');
            }
        }
    };
}

export const cart = createCartStore();

export const cartCount = derived(cart, $cart =>
    $cart.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartTotal = derived(cart, $cart =>
    $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
