import API from "../axiosInstance";
import { roleUpgradeRequestEndpoints } from "../endpoints";

const roleUpgradeRequestService = {

    create(message) {
        return API.post(
            roleUpgradeRequestEndpoints.create,
            { requestedRole:"AUTHOR" ,message }
        );
    },

    getMyRequest() {
        return API.get(
            roleUpgradeRequestEndpoints.getMyRequest
        );
    },

    getPending(page = 0, size = 10) {
        return API.get(
            roleUpgradeRequestEndpoints.getPendingRequests,
            {
                params: {
                    page,
                    size
                }
            }
        );
    },

    approve(requestId) {
        return API.patch(
            roleUpgradeRequestEndpoints.approve.replace(
                ":requestId",
                requestId
            )
        );
    },

    reject(requestId) {
        return API.patch(
            roleUpgradeRequestEndpoints.reject.replace(
                ":requestId",
                requestId
            )
        );
    }
};

export default roleUpgradeRequestService;