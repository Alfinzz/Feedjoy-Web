// Get Profile Use Case
// Retrieves current user's profile information

import type { User } from '../../entities/User';

// Repository interface
export interface AuthRepository {
    getProfile(): Promise<User>;
}

export class GetProfileUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(): Promise<User> {
        return await this.authRepository.getProfile();
    }
}
